import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import productRoute from './productRoute';

const index = express.Router();
index.use('/auth', authRoute);
index.use('/user', userRoute);
index.use('/product', productRoute);

export default index;
