import UnitService from '../services/unitService';

const service = new UnitService();
class UnitController {
  static async findAll(req, res, next) {
    try {
      const { page, pageSize } = req.query;
      const unit = await service.getAll(page, pageSize);
      if (unit.data.length === 0) {
        res
          .status(200)
          .json({ status: 200, result: [], message: 'No unit found' });
      } else {
        res
          .status(200)
          .json({ status: 200, result: unit, message: 'Success get unit' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const unit = await service.getById(id);
      res
        .status(200)
        .json({ status: 200, result: unit, message: 'Success get unit' });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const payload = req.body;
    try {
      const units = await service.create(payload);
      res.status(201).json(units);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const payload = req.body;
    const { id } = req.params;
    try {
      const units = await service.update(id, payload);
      res.status(200).json(units);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      await service.delete(id);
      res.status(200).json({ status: 200, message: 'Berhasil hapus satuan' });
    } catch (error) {
      next(error);
    }
  }
}

export default UnitController;
