import express from 'express';
import UserController from '../controllers/userController';

const authRoute = express.Router();

authRoute.post('/login', UserController.login);
authRoute.post('/register', UserController.create);

export default authRoute;
