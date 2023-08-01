import express from 'express';
import UserController from '../controllers/userController';

const authRoute = express.Router();

authRoute.post('/login', UserController.login);

export default authRoute;
