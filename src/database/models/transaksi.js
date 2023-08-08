'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi.init({
    id_pesan: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    pengirim: DataTypes.STRING,
    penerima: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telepon: DataTypes.STRING,
    email: DataTypes.STRING,
    kuantiti_total: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER,
    pembayaran: DataTypes.INTEGER,
    id_status: DataTypes.INTEGER,
    pesan_at: DataTypes.DATE,
    kirim_at: DataTypes.DATE,
    terima_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};