import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import AWS from 'aws-sdk';
import swaggerDocument from '../swagger.json';
import routes from './routes';
import ErrorHandler from './middleware/error.middleware';
import Logger from './utils/logger';
import sequelize from './config/database';
import S3Config from './config/s3';

const app = express();
const port = 3200;

AWS.config.update({
  accessKeyId: S3Config.accessKeyId,
  secretAccessKey: S3Config.secretAccessKey,
  region: S3Config.region // Contoh: 'us-west-1'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);
app.use(ErrorHandler);

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
