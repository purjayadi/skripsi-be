import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';

const index = express.Router();
index.use('/auth', authRoute);
index.use('/user', userRoute);

export default index;
