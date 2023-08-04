import express from 'express';
import auth from '../middleware/auth.middleware';
import OrderController from '../controllers/orderController';

const orderRoute = express.Router();

orderRoute.get('/', auth, OrderController.findAll);
orderRoute.get('/detail/:id', auth, OrderController.findOne);
orderRoute.get('/code/:code', auth, OrderController.findByCode);
orderRoute.post('/', auth, OrderController.create);
orderRoute.patch('/:id', auth, OrderController.update);
orderRoute.delete('/:id', auth, OrderController.delete);

export default orderRoute;
