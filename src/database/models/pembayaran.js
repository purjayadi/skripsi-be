'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pembayaran.init({
    id_pesan: DataTypes.STRING,
    nama: DataTypes.STRING,
    nominal: DataTypes.INTEGER,
    gambar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pembayaran',
  });
  return pembayaran;
};