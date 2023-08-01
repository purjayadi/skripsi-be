import express from 'express';
import multer from 'multer';
import FileController from '../controllers/fileController';
import auth from '../middleware/auth.middleware';

const fileRoute = express.Router();
const upload = multer({ dest: 'uploads/' });

fileRoute.post('/upload', auth, upload.single('image'), FileController.upload);

export default fileRoute;
