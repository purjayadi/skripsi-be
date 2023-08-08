const { hashSync, genSaltSync } = require('bcrypt');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    sandi: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.ENUM('ADMIN', 'USER')
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    hooks: {
      beforeSave: (user) => {
        if (user.changed('sandi')) {
          user.sandi = hashSync(user.sandi, genSaltSync(10));
        }
      }
    },
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['sandi'] }
      }
    }
  });

  return User;
};
