import express from 'express';
import PurchaseController from '../controllers/purchaseController';
import auth from '../middleware/auth.middleware';

const purchaseRoute = express.Router();

purchaseRoute.get('/', auth, PurchaseController.findAll);
purchaseRoute.get('/detail/:id', auth, PurchaseController.findOne);
purchaseRoute.get('/code/:code', auth, PurchaseController.findByCode);
purchaseRoute.post('/', auth, PurchaseController.create);
purchaseRoute.patch('/:id', auth, PurchaseController.update);
purchaseRoute.delete('/:id', auth, PurchaseController.delete);

export default purchaseRoute;
