'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  penjualan.init({
    id_penjualan: DataTypes.INTEGER,
    id_produk: DataTypes.INTEGER,
    jual: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'penjualan',
  });
  return penjualan;
};