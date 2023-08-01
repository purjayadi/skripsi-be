const {
  Model
} = require('sequelize');
const { generateUniqueCode } = require('../../utils/helper');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionDetail, {
        foreignKey: 'transactionId'
      });

      Transaction.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Transaction.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    total: DataTypes.DECIMAL,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeSave: (transaction) => {
        transaction.code = generateUniqueCode('INV');
      }
    }
  });

  return Transaction;
};
