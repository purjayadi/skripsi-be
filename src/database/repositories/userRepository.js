import BaseRepository from '../../common/baseRepository';
import models from '../models';

class UserRepository extends BaseRepository {
  constructor() {
    super(models.User);
  }

  async findByUsername(username) {
    return this.model.findOne({
      where: { username }
    });
  }
}

export default UserRepository;
