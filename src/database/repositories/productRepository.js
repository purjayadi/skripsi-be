import { APIErrorException } from '../../common/HttpException';
import BaseRepository from '../../common/baseRepository';
import models from '../models';

class ProductRepository extends BaseRepository {
  constructor() {
    super(models.produk);
  }

  async findAll(page, pageSize) {
    try {
      return this.model.findAndCountAll({
        ...(page && { offset: (Number(page) - 1) * Number(pageSize) }),
        ...(pageSize && { limit: Number(pageSize) }),
        distinct: true,
        col: this.model.id_barang
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }
}

export default ProductRepository;
