import BaseRepository from '../../common/baseRepository';
import sequelize from '../../config/database';
import { APIErrorException } from '../../common/HttpException';
import model from '../models';

const { PurchaseDetail, Purchase, Product } = model;
class PurchaseRepository extends BaseRepository {
  /**
   * Initializes the PurchaseRepository class.
   */
  constructor() {
    super(Purchase);
  }

  async findAll(page, pageSize) {
    try {
      return await this.model.scope('supplier', 'purchaseDetail').findAndCountAll({
        ...(page && { offset: (Number(page) - 1) * Number(pageSize) }),
        ...(pageSize && { limit: Number(pageSize) }),
        attributes: { exclude: ['deletedAt', 'supplierId'] },
        distinct: true,
        col: 'Purchase.id',
        order: [['createdAt', 'desc']]
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async findById(id) {
    try {
      return await this.model.scope('supplier', 'purchaseDetail').findOne({
        where: { id },
        attributes: { exclude: ['deletedAt', 'supplierId'] }
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async create(payload) {
    const t = await sequelize.transaction();
    try {
      const purchase = await this.model.create(payload, { transaction: t });
      const purchaseDetailList = payload.products.map((item) => ({
        ...item,
        purchaseId: purchase.id
      }));
      await PurchaseDetail.bulkCreate(purchaseDetailList, { transaction: t });
      purchaseDetailList.map(async (item) => {
        await Product.increment(
          { stock: item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await t.commit();
      return purchase;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async update(id, payload) {
    const t = await sequelize.transaction();
    try {
      const purchase = await this.model.update(payload, { where: { id } }, { transaction: t });
      const purchaseDetailList = payload.products.map((item) => ({
        ...item,
        purchaseId: id
      }));
      const findPurchaseDetail = await PurchaseDetail.findAll({
        where: { purchaseId: id }
      });
      const promiseOldStock = findPurchaseDetail.map(async (item) => {
        await Product.increment(
          { stock: -item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await Promise.all(promiseOldStock);
      await PurchaseDetail.destroy({
        where: {
          purchaseId: id
        }
      }, { transaction: t });
      await PurchaseDetail.bulkCreate(purchaseDetailList, { transaction: t });
      purchaseDetailList.map(async (item) => {
        await Product.increment(
          { stock: item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await t.commit();
      return purchase;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async delete(id) {
    const t = await sequelize.transaction();
    try {
      const purchase = await Purchase.destroy({
        where: {
          id
        }
      }, { transaction: t });
      const findPurchaseDetail = await PurchaseDetail.findAll({
        where: { purchaseId: id }
      });
      const promiseOldStock = findPurchaseDetail.map(async (item) => {
        await Product.increment(
          { stock: -item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      await Promise.all(promiseOldStock);
      await PurchaseDetail.destroy({
        where: {
          purchaseId: id
        }
      }, { transaction: t });
      await t.commit();
      return purchase;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }
}

export default PurchaseRepository;
