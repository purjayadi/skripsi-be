import BaseService from '../common/baseService';
import UnitRepository from '../database/repositories/unitRepository';
import { DuplicateException } from '../utils/HttpException';

class UnitService extends BaseService {
  constructor() {
    const repository = new UnitRepository();
    super(repository);
  }

  async create(payload) {
    const isExist = await this.repository.findByName(payload.name);
    if (isExist) throw new DuplicateException(`Satuan dengan nama ${payload.name} telah ada`);
    const unit = await this.repository.create(payload);
    return unit;
  }
}

export default UnitService;
