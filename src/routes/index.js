import express from 'express';
import userRoute from './userRoute';
import unitRoute from './unitRoute';
import productRoute from './productRoute';
import authRoute from './authRoute';
import fileRoute from './fileRoute';
import purchaseRoute from './purchaseRoute';

const index = express.Router();

index.use('/user', userRoute);
index.use('/unit', unitRoute);
index.use('/product', productRoute);
index.use('/purchase', purchaseRoute);
index.use('/auth', authRoute);
index.use('/file', fileRoute);

export default index;
