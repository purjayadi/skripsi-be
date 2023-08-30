import BaseService from '../common/baseService';
import ProductRepository from '../database/repositories/productRepository';

class ProductService extends BaseService {
  constructor() {
    const repository = new ProductRepository();
    super(repository);
  }
}

export default ProductService;
