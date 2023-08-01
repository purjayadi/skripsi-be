import BaseRepository from '../../common/baseRepository';
import models from '../models';

class UnitRepository extends BaseRepository {
  constructor() {
    super(models.Unit);
  }

  async findByName(name) {
    return this.model.findOne({
      where: {
        name
      }
    });
  }
}

export default UnitRepository;
