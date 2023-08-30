import ProductService from '../services/productService';

const service = new ProductService();
class ProductController {
  static async getAll(req, res, next) {
    try {
      const { page, pageSize } = req.query;
      const products = await service.getAll(page, pageSize);
      if (products.data.length === 0) {
        res
          .status(200)
          .json({ status: 200, result: [], message: 'No products found' });
      } else {
        res
          .status(200)
          .json({ status: 200, result: products, message: 'Success get products' });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
