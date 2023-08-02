import SupplierService from '../services/supplierService';

const service = new SupplierService();
class SupplierController {
  static async getAll(req, res, next) {
    try {
      const { page, pageSize } = req.query;
      const supplier = await service.getAll(page, pageSize);
      if (supplier.data.length === 0) {
        res
          .status(200)
          .json({ status: 200, result: [], message: 'No supplier found' });
      } else {
        res
          .status(200)
          .json({ status: 200, result: supplier, message: 'Success get supplier' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const payload = req.body;
    try {
      await service.create(payload);
      res.status(200).json({ status: 200, message: 'Berhasil tambah supplier' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const payload = req.body;
    const { id } = req.params;
    try {
      await service.update(id, payload);
      res.status(200).json({ status: 200, message: 'Berhasil ubah supplier' });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      await service.delete(id);
      res.json({ status: 200, message: 'Berhasil hapus supplier' });
    } catch (error) {
      next(error);
    }
  }
}

export default SupplierController;
