import BaseService from '../common/baseService';
import PurchaseRepository from '../database/repositories/purchaseRepository';
import { calculateSubtotal } from '../utils/helper';
import Pagination from '../utils/pagination';

class PurchaseService extends BaseService {
  constructor() {
    const repository = new PurchaseRepository();
    super(repository);
  }

  async getAll(page, pageSize) {
    const data = await this.repository.findAll();
    return Pagination(data, page, pageSize);
  }

  async create(payload, userId) {
    let total = 0;
    const products = payload.products.map((product) => {
      const { qty, price } = product;
      const subtotal = calculateSubtotal(qty, price);
      total += subtotal;
      return ({
        ...product,
        subTotal: subtotal
      });
    });
    const newPurchase = {
      userId,
      date: payload.date,
      total,
      products
    };
    const purchase = await this.repository.create(newPurchase);
    return purchase;
  }

  async update(id, payload) {
    const purchase = await this.repository.update(id, payload);
    return purchase;
  }
}

export default PurchaseService;
