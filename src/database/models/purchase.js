const {
  Model
} = require('sequelize');
const { generateUniqueCode } = require('../../utils/helper');

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchase.hasMany(models.PurchaseDetail, {
        foreignKey: 'purchaseId'
      });

      Purchase.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Purchase.belongsTo(models.Supplier, {
        foreignKey: 'supplierId'
      });
    }
  }
  Purchase.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    total: DataTypes.DECIMAL,
    userId: DataTypes.STRING,
    supplierId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Purchase',
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeSave: (purchase) => {
        purchase.code = generateUniqueCode('NPB');
      }
    }
  });

  Purchase.addScope('purchaseDetail', () => ({
    include: [
      {
        model: sequelize.models.PurchaseDetail,
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'purchaseId', 'productId'] },
        include: {
          model: sequelize.models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
      }
    ]
  }));

  Purchase.addScope('supplier', () => ({
    include: [
      {
        model: sequelize.models.Supplier,
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
      }
    ]
  }));

  return Purchase;
};
