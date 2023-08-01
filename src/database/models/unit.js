const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Unit.hasMany(models.ProductPrice, {
        foreignKey: 'unitId'
      });
    }
  }
  Unit.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Unit',
    paranoid: true,
    timestamps: true
  });
  return Unit;
};