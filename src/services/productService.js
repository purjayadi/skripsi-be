import BaseService from '../common/baseService';
import ProductRepository from '../database/repositories/productRepository';
import { DuplicateException, NotFoundException } from '../utils/HttpException';
import Pagination from '../utils/pagination';

const repository = new ProductRepository();
class ProductService extends BaseService {
  constructor() {
    super(repository);
  }

  async getAll(page, pageSize) {
    const data = await repository.findAll();
    return Pagination(data, page, pageSize);
  }

  async getByCode(code) {
    const data = await repository.findByCode(code);
    if (!data) throw new NotFoundException(`Data dengan kode barang ${code} tidak ditemukan`);
    return data;
  }

  async create(payload) {
    const isCodeExist = await repository.findByCode(payload.code);
    if (isCodeExist) throw new DuplicateException(`Produk dengan kode ${payload.code} sudah ada`);
    const product = await repository.create(payload);
    return product;
  }

  async update(id, payload) {
    const product = await repository.update(id, payload);
    return product;
  }
}

export default ProductService;
