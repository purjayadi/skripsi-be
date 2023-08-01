const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductPrice.belongsTo(models.Product, {
        foreignKey: 'productId'
      });

      ProductPrice.belongsTo(models.Unit, {
        foreignKey: 'unitId'
      });
    }
  }
  ProductPrice.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    productId: DataTypes.STRING,
    unitId: DataTypes.STRING,
    ritelPrice: DataTypes.DECIMAL,
    wholesalePrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ProductPrice',
    paranoid: true,
    timestamps: true
  });

  return ProductPrice;
};
