const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseDetail.belongsTo(models.Product, {
        foreignKey: 'productId'
      });

      PurchaseDetail.belongsTo(models.Purchase, {
        foreignKey: 'purchaseId'
      });
    }
  }
  PurchaseDetail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    purchaseId: DataTypes.STRING,
    productId: DataTypes.STRING,
    qty: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    subTotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'PurchaseDetail',
    paranoid: true,
    timestamps: true
  });

  return PurchaseDetail;
};
