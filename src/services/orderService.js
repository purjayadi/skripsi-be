import { NotFoundException } from '../common/HttpException';
import BaseService from '../common/baseService';
import OrderRepository from '../database/repositories/orderRepository';
import ProductRepository from '../database/repositories/productRepository';
import { calculateSubtotal } from '../utils/helper';

const productRepository = new ProductRepository();
class OrderService extends BaseService {
  constructor() {
    const repository = new OrderRepository();
    super(repository);
  }

  async create(payload, userId) {
    let total = 0;
    const listProducts = [];
    const products = payload.products.map(async (product) => {
      const findPrice = await productRepository.findPriceProduct(product.productId, product.unitId);
      const { qty } = product;
      const price = payload.type === 'Ritel' ? findPrice.ritelPrice : findPrice.wholesalePrice;
      const subtotal = calculateSubtotal(qty, price);
      total += subtotal - product.discount;
      listProducts.push({
        ...product,
        price,
        subTotal: subtotal - product.discount
      });
    });
    await Promise.all(products);
    const newOrder = {
      userId,
      date: payload.date,
      total,
      type: payload.type,
      products: listProducts
    };
    const transaction = await this.repository.create(newOrder);
    return transaction;
  }

  async update(id, payload) {
    const findOrder = await this.repository.findById(id);
    if (!findOrder) throw new NotFoundException('Data tidak ditemukan');
    let total = 0;
    const listProducts = [];
    const products = payload.products.map(async (product) => {
      const findPrice = await productRepository.findPriceProduct(product.productId, product.unitId);
      const { qty } = product;
      const price = payload.type === 'Ritel' ? findPrice.ritelPrice : findPrice.wholesalePrice;
      const subtotal = calculateSubtotal(qty, price);
      total += subtotal - product.discount;
      listProducts.push({
        ...product,
        price,
        subTotal: subtotal - product.discount
      });
    });
    await Promise.all(products);
    const newOrder = {
      date: payload.date,
      total,
      type: payload.type,
      products: listProducts
    };
    const transaction = await this.repository.update(id, newOrder);
    return transaction;
  }
}

export default OrderService;
