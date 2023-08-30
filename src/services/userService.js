import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import BaseService from '../common/baseService';
import UserRepository from '../database/repositories/userRepository';
import jwtConfig from '../config/jwt';
import { DuplicateException, UnauthorizedException } from '../common/HttpException';

class UserService extends BaseService {
  constructor() {
    const repository = new UserRepository();
    super(repository);
  }

  async create(payload) {
    const isExist = await this.repository.findByEmail(payload.email);
    if (isExist) throw new DuplicateException('Email already exist');
    const user = this.repository.create(payload);
    return user;
  }

  async login(email, sandi) {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const validPassword = await bcrypt.compare(sandi, user?.sandi);
    if (!validPassword) throw new UnauthorizedException('Invalid email or password');
    const jwtPayload = { id: user.id_user, role: user.role };
    const token = jwt.sign(jwtPayload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return token;
  }
}

export default UserService;
