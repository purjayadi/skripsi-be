import UserService from '../services/userService';

const service = new UserService();
class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const token = await service.login(username, password);
      res
        .status(200)
        .json({ status: 200, accessToken: token, message: 'Login success' });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { page, pageSize } = req.query;
      const users = await service.getAll(page, pageSize);
      if (users.data.length === 0) {
        res
          .status(200)
          .json({ status: 200, result: [], message: 'No users found' });
      } else {
        res
          .status(200)
          .json({ status: 200, result: users, message: 'Success get users' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const payload = req.body;
    try {
      const users = await service.create(payload);
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const payload = req.body;
    const { id } = req.params;
    try {
      const users = await service.update(id, payload);
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      await service.delete(id);
      res.json({ status: 200, message: 'Success delete user' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
