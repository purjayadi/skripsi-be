const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductPrice, {
        foreignKey: 'productId'
      });
      Product.hasMany(models.PurchaseDetail, {
        foreignKey: 'productId'
      });
      Product.hasMany(models.Stock, {
        foreignKey: 'productId'
      });
    }
  }
  Product.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    stock: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true,
    timestamps: true
  });

  Product.addScope('withPrice', () => ({
    include: [
      {
        model: sequelize.models.ProductPrice,
        attributes: { exclude: ['productId', 'unitId', 'createdAt', 'updatedAt', 'deletedAt'] },
        include: {
          model: sequelize.models.Unit,
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
      }
    ]
  }));

  return Product;
};
