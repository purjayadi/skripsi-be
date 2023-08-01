import express from 'express';
import UnitController from '../controllers/unitController';

const unitRoute = express.Router();

unitRoute.get('/', UnitController.findAll);
unitRoute.get('/detail/:id', UnitController.findOne);
unitRoute.post('/', UnitController.create);
unitRoute.patch('/', UnitController.update);
unitRoute.delete('/:id', UnitController.delete);

export default unitRoute;
