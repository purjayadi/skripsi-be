import { APIErrorException } from '../utils/HttpException/index';

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async bulkCreate(data) {
    return this.model.bulkCreate(data);
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async update(id, data) {
    await this.model.update(data, {
      where: { id }
    });
  }

  async delete(id) {
    await this.model.destroy({
      where: { id }
    });
  }

  async findAll() {
    try {
      return this.model.findAndCountAll({
        attributes: { exclude: ['deletedAt'] }
      });
    } catch (error) {
      console.log(error);
      throw new APIErrorException(error);
    }
  }
}

export default BaseRepository;
