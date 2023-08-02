import Pagination from '../utils/pagination';
import { NotFoundException } from './HttpException';

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(page, pageSize) {
    const data = await this.repository.findAll(page, pageSize);
    return Pagination(data, page, pageSize);
  }

  async getById(id) {
    const findData = await this.repository.findById(id);
    if (!findData) {
      throw new NotFoundException('Data not found');
    }
    return this.repository.findById(id);
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    const findData = await this.repository.findById(id);
    if (!findData) {
      throw new NotFoundException('Data not found');
    }
    return this.repository.update(id, data);
  }

  async delete(id) {
    const findData = await this.repository.findById(id);
    if (!findData) {
      throw new NotFoundException('Data not found');
    }
    return this.repository.delete(id);
  }
}

export default BaseService;
