import FileService from '../services/fileService';

const service = new FileService();
class FileController {
  static async upload(req, res, next) {
    try {
      const { file } = req;
      const uploadFIle = await service.upload(file);
      res
        .status(200)
        .json({ status: 200, result: uploadFIle, message: 'Upload gambar berhasil' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default FileController;
