import BaseService from '../common/baseService';
import SupplierRepository from '../database/repositories/supplierRepository';

class SupplierService extends BaseService {
  constructor() {
    const repository = new SupplierRepository();
    super(repository);
  }
}

export default SupplierService;
