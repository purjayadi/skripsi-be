import PurchaseService from '../services/purchaseService';

const service = new PurchaseService();
class PurchaseController {
  static async findAll(req, res, next) {
    try {
      const { page, pageSize } = req.query;
      const unit = await service.getAll(page, pageSize);
      if (unit.data.length === 0) {
        res
          .status(200)
          .json({ status: 200, result: [], message: 'Transaksi pembelian tidak ditemukan' });
      } else {
        res
          .status(200)
          .json({ status: 200, result: unit, message: 'Pencarian data berhasil' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await service.getById(id);
      res
        .status(200)
        .json({ status: 200, result: product, message: 'Pencarian data berhasil' });
    } catch (error) {
      next(error);
    }
  }

  static async findByCode(req, res, next) {
    try {
      const { code } = req.params;
      const product = await service.getByCode(code);
      res
        .status(200)
        .json({ status: 200, result: product, message: 'Pencarian data berhasil' });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const payload = req.body;
    const { user } = req;
    try {
      await service.create(payload, user.id);
      res.status(201).json({ status: 201, message: 'Tambah pembelian berhasil' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const payload = req.body;
    try {
      await service.update(id, payload);
      res.status(200).json({ status: 201, message: 'Ubah pembelian berhasil' });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      await service.delete(id);
      res.status(200).json({ status: 200, message: 'Berhasil hapus pembelian produk' });
    } catch (error) {
      next(error);
    }
  }
}

export default PurchaseController;
