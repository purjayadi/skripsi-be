import BaseRepository from '../../common/baseRepository';
import sequelize from '../../config/database';
import model from '../models';
import { APIErrorException } from '../../utils/HttpException/index';

const { ProductPrice, Product } = model;

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findAll() {
    try {
      return await this.model.scope('withPrice').findAndCountAll({
        attributes: { exclude: ['deletedAt'] },

        order: [['createdAt', 'desc']]
      });
    } catch (error) {
      throw new APIErrorException(error);
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
      throw new APIErrorException(error);
    }
  }

  async update(id, payload) {
    const t = await sequelize.transaction();
    try {
      const product = await this.model.update(id, payload, { transaction: t });
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
      throw new APIErrorException(error);
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
      throw new APIErrorException(error.message);
    }
  }

  async increaseStock(productId, stock) {
    try {
      await this.model.increment({ stock }, { where: { id: productId } });
    } catch (error) {
      throw new APIErrorException(error.message);
    }
  }

  async decrementStock(productId, stock) {
    try {
      await this.model.increment(
        { stock: -Number(stock) },
        { where: { id: productId } }
      );
    } catch (error) {
      throw new APIErrorException(error.message);
    }
  }
}

export default ProductRepository;
