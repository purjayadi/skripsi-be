'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kontak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kontak.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tentang: DataTypes.STRING,
    pesan: DataTypes.STRING,
    tgl: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'kontak',
  });
  return kontak;
};