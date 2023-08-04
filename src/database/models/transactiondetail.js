const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Product, {
        foreignKey: 'productId'
      });

      TransactionDetail.belongsTo(models.Transaction, {
        foreignKey: 'transactionId'
      });
    }
  }
  TransactionDetail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    transactionId: DataTypes.STRING,
    productId: DataTypes.STRING,
    unitId: DataTypes.STRING,
    qty: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    subTotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'TransactionDetail',
    paranoid: true,
    timestamps: true
  });
  return TransactionDetail;
};
