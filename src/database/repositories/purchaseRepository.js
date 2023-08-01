import BaseRepository from '../../common/baseRepository';
import sequelize from '../../config/database';
import { APIErrorException } from '../../utils/HttpException';
import model from '../models';

const { PurchaseDetail, Purchase, Product } = model;

class PurchaseRepository extends BaseRepository {
  constructor() {
    super(Purchase);
  }

  async findAll() {
    try {
      return await this.model.scope('purchaseDetail').findAndCountAll({
        attributes: { exclude: ['deletedAt'] },

        order: [['createdAt', 'desc']]
      });
    } catch (error) {
      console.log(error);
      throw new APIErrorException(error);
    }
  }

  async create(payload) {
    const t = await sequelize.transaction();
    try {
      const purchase = await this.model.create(payload, { transaction: t });
      const PurchaseDetailList = payload.products.map((item) => ({
        ...item,
        purchaseId: purchase.id
      }));
      await PurchaseDetail.bulkCreate(PurchaseDetailList, { transaction: t });
      PurchaseDetailList.map(async (item) => {
        await Product.increment(
          { stock: item.qty },
          { where: { id: item.productId } },
          { transaction: t }
        );
      });
      t.commit();
      return purchase;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async update(id, payload) {
    const t = await sequelize.transaction();
    try {
      const product = await this.model.update(id, payload, { transaction: t });
      const PurchaseDetailList = payload.products.map((item) => ({
        ...item,
        productId: product.id
      }));
      await PurchaseDetail.destroy({
        where: {
          productId: id
        }
      }, { transaction: t });
      await PurchaseDetail.bulkCreate(PurchaseDetailList, { transaction: t });
      t.commit();
      return product;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException(error);
    }
  }
}

export default PurchaseRepository;
