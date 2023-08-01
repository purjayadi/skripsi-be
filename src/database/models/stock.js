const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
    }
  }
  Stock.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    productId: DataTypes.STRING,
    openingStock: DataTypes.INTEGER,
    closingStock: DataTypes.INTEGER,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Stock',
    paranoid: true,
    timestamps: true
  });
  return Stock;
};
