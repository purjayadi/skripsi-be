import express from 'express';
import ProductController from '../controllers/productController';

const productRoute = express.Router();

productRoute.get('/', ProductController.getAll);

export default productRoute;
