import { APIErrorException } from './HttpException';

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return this.model.create(data);
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async bulkCreate(data) {
    try {
      return this.model.bulkCreate(data);
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async findById(id) {
    try {
      return this.model.findByPk(id);
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async update(id, data) {
    try {
      return await this.model.update(data, {
        where: { id }
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async delete(id) {
    try {
      await this.model.destroy({
        where: { id }
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }

  async findAll(page, pageSize) {
    try {
      return this.model.findAndCountAll({
        ...(page && { offset: (Number(page) - 1) * Number(pageSize) }),
        ...(pageSize && { limit: Number(pageSize) }),
        attributes: { exclude: ['deletedAt'] }
      });
    } catch (error) {
      throw new APIErrorException('API_ERROR', 500, error.message);
    }
  }
}

export default BaseRepository;
