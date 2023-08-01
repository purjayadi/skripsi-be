import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import BaseService from '../common/baseService';
import UserRepository from '../database/repositories/userRepository';
import jwtConfig from '../config/jwt';
import { DuplicateException, UnauthorizedException } from '../utils/HttpException/index';

class UserService extends BaseService {
  constructor() {
    const repository = new UserRepository();
    super(repository);
  }

  async create(payload) {
    const isExist = await this.repository.findByUsername(payload.username);
    if (isExist) throw new DuplicateException('Username already exist');
    const user = this.repository.create(payload);
    return user;
  }

  async login(username, password) {
    const user = await this.repository.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const validPassword = await bcrypt.compare(password, user?.password);
    if (!validPassword) throw new UnauthorizedException('Invalid username or password');
    const jwtPayload = { id: user.id, role: user.role };
    const token = jwt.sign(jwtPayload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return token;
  }
}

export default UserService;
