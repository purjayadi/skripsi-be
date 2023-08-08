'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init({
    id_user: DataTypes.INTEGER,
    id_produk: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    kuantiti: DataTypes.INTEGER,
    gambar: DataTypes.STRING,
    kategori: DataTypes.STRING,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};