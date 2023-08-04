import BaseRepository from '../../common/baseRepository';
import sequelize from '../../config/database';
import { APIErrorException } from '../../common/HttpException';
import model from '../models';

const { TransactionDetail, Transaction, Product } = model;
class OrderRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }

  async findAll(page, pageSize) {
    try {
      return await this.model.scope('transactionDetail').findAndCountAll({
        ...(page && { offset: (Number(page) - 1) * Number(pageSize) }),
        ...(pageSize && { limit: Number(pageSize) }),
        attributes: { exclude: ['deletedAt', 'userId'] },
        distinct: true,
        col: 'Transaction.id',
        order: [['createdAt', 'desc']]
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async findById(id) {
    try {
      return await this.model.scope('transactionDetail').findOne({
        where: { id }
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async create(payload) {
    const t = await sequelize.transaction();
    try {
      const transaction = await this.model.create(payload, { transaction: t });
      const transactionDetail = payload.products.map((item) => ({
        ...item,
        transactionId: transaction.id
      }));
      await TransactionDetail.bulkCreate(transactionDetail, {
        transaction: t
      });
      transactionDetail.map(async (item) => {
        await Product.increment(
          { stock: -item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await t.commit();
      return transaction;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async update(id, payload) {
    const t = await sequelize.transaction();
    try {
      const transaction = await this.model.update(
        payload,
        { where: { id } },
        { transaction: t }
      );
      const purchaseDetailList = payload.products.map((item) => ({
        ...item,
        transactionId: id
      }));
      const findTransactionDetail = await TransactionDetail.findAll({
        where: { transactionId: id }
      });
      const promiseOldStock = findTransactionDetail.map(async (item) => {
        await Product.increment(
          { stock: item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await Promise.all(promiseOldStock);
      await TransactionDetail.destroy(
        {
          where: {
            transactionId: id
          }
        },
        { transaction: t }
      );
      await TransactionDetail.bulkCreate(purchaseDetailList, {
        transaction: t
      });
      purchaseDetailList.map(async (item) => {
        await Product.increment(
          { stock: -item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await t.commit();
      return transaction;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async delete(id) {
    const t = await sequelize.transaction();
    try {
      const transaction = await this.model.destroy(
        {
          where: {
            id
          }
        },
        { transaction: t }
      );
      const findTransactionDetail = await TransactionDetail.findAll({
        where: { transactionId: id }
      });
      const promiseOldStock = findTransactionDetail.map(async (item) => {
        await Product.increment(
          { stock: item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await Promise.all(promiseOldStock);
      await TransactionDetail.destroy(
        {
          where: {
            transactionId: id
          }
        },
        { transaction: t }
      );
      await t.commit();
      return transaction;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }
}

export default OrderRepository;
