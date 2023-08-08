import BaseRepository from '../../common/baseRepository';
import models from '../models';

class UserRepository extends BaseRepository {
  constructor() {
    super(models.users);
  }

  async findByEmail(email) {
    return this.model.findOne({
      where: { email }
    });
  }
}

export default UserRepository;
