import express from 'express';
import UserController from '../controllers/userController';
import auth from '../middleware/auth.middleware';

const userRoute = express.Router();

userRoute.get('/', auth, UserController.getAll);
userRoute.post('/', auth, UserController.create);
userRoute.patch('/:id', auth, UserController.update);
userRoute.delete('/:id', auth, UserController.delete);

export default userRoute;
