'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi_detail.init({
    id_transaksi: DataTypes.INTEGER,
    id_pesan: DataTypes.INTEGER,
    id_produk: DataTypes.STRING,
    kuantiti: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi_detail',
  });
  return transaksi_detail;
};