import { NotFoundException } from '../common/HttpException';
import BaseService from '../common/baseService';
import PurchaseRepository from '../database/repositories/purchaseRepository';
import { calculateSubtotal } from '../utils/helper';

class PurchaseService extends BaseService {
  constructor() {
    const repository = new PurchaseRepository();
    super(repository);
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
      supplierId: payload.supplierId,
      date: payload.date,
      total,
      products
    };
    const purchase = await this.repository.create(newPurchase);
    return purchase;
  }

  async update(id, payload) {
    const findPurchase = await this.repository.findById(id);
    if (!findPurchase) throw new NotFoundException('Data tidak ditemukan');
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
      date: payload.date,
      supplierId: payload.supplierId,
      total,
      products
    };
    const purchase = await this.repository.update(id, newPurchase);
    return purchase;
  }
}

export default PurchaseService;
