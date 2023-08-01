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
      User.hasMany(models.Purchase, {
        foreignKey: 'userId'
      });

      User.hasMany(models.Transaction, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('ADMIN', 'KASIR'),
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeSave: (user) => {
        if (user.changed('password')) {
          user.password = hashSync(user.password, genSaltSync(10));
        }
      }
    },
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] }
      }
    }
  });

  return User;
};
