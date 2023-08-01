import express from 'express';
import ProductController from '../controllers/productController';
import auth from '../middleware/auth.middleware';

const productRoute = express.Router();

productRoute.get('/', auth, ProductController.findAll);
productRoute.get('/detail/:id', auth, ProductController.findOne);
productRoute.get('/code/:code', auth, ProductController.findByCode);
productRoute.post('/', auth, ProductController.create);
productRoute.patch('/:id', auth, ProductController.update);
productRoute.delete('/:id', auth, ProductController.delete);

export default productRoute;
