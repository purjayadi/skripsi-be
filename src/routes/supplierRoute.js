import express from 'express';
import auth from '../middleware/auth.middleware';
import SupplierController from '../controllers/supplierController';

const supplierRoute = express.Router();

supplierRoute.get('/', auth, SupplierController.getAll);
supplierRoute.post('/', auth, SupplierController.create);
supplierRoute.patch('/:id', auth, SupplierController.update);
supplierRoute.delete('/:id', auth, SupplierController.delete);

export default supplierRoute;
