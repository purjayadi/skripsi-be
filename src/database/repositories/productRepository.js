import BaseRepository from '../../common/baseRepository';
import sequelize from '../../config/database';
import model from '../models';
import { APIErrorException } from '../../common/HttpException/index';

const { ProductPrice, Product } = model;

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findAll(page, pageSize) {
    try {
      return await this.model.scope('withPrice').findAndCountAll({
        ...(page && { offset: (Number(page) - 1) * Number(pageSize) }),
        ...(pageSize && { limit: Number(pageSize) }),
        attributes: { exclude: ['deletedAt'] },
        order: [['createdAt', 'desc']]
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async create(payload) {
    const t = await sequelize.transaction();
    try {
      const product = await this.model.create(payload, { transaction: t });
      const productPriceList = payload.productDetail.map((item) => ({
        ...item,
        productId: product.id
      }));
      await ProductPrice.bulkCreate(productPriceList, { transaction: t });
      t.commit();
      return product;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async update(id, payload) {
    const t = await sequelize.transaction();
    try {
      const product = await this.model.update(payload, { where: { id } }, { transaction: t });
      const productPriceList = payload.productDetail.map((item) => ({
        ...item,
        productId: product.id
      }));
      await ProductPrice.destroy({
        where: {
          productId: id
        }
      }, { transaction: t });
      await ProductPrice.bulkCreate(productPriceList, { transaction: t });
      t.commit();
      return product;
    } catch (error) {
      await t.rollback();
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async findByCode(code) {
    try {
      return await this.model.findOne({
        where: {
          code
        }
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async increaseStock(productId, stock) {
    try {
      await this.model.increment({ stock }, { where: { id: productId } });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async decrementStock(productId, stock) {
    try {
      await this.model.increment(
        { stock: -stock },
        { where: { id: productId } }
      );
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }
}

export default ProductRepository;
