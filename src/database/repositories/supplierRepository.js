import BaseRepository from '../../common/baseRepository';
import models from '../models';

class SupplierRepository extends BaseRepository {
  constructor() {
    super(models.Supplier);
  }
}

export default SupplierRepository;
