import sharp from 'sharp';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { BadRequestException } from '../common/HttpException';

class FileService {
  async upload(file) {
    const imagePath = file.path;
    try {
      const compressedImagePath = `uploads/compressed-${file.originalname}`;
      await sharp(imagePath)
        .resize(300)
        .jpeg({ quality: 50 })
        .toFile(compressedImagePath);

      fs.unlinkSync(imagePath);

      const S3 = new AWS.S3();
      const extension = path.extname(file.originalname);
      const uploadParams = {
        Bucket: 'gm-pos',
        Key: `image/${Date.now().toString()}${extension}`,
        ContentType: file.mimetype,
        Body: fs.createReadStream(compressedImagePath),
        ACL: 'public-read'
      };

      const uploadedData = await S3.upload(uploadParams).promise();
      fs.unlinkSync(compressedImagePath);
      return uploadedData;
    } catch (error) {
      throw new BadRequestException('Upload photo gagal');
    }
  }
}

export default FileService;
