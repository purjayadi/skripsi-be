const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  produk.init({
    id_barang: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    harga: DataTypes.DECIMAL,
    stok: DataTypes.INTEGER,
    gamber: DataTypes.STRING,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produk',
    tableName: 'produk'
  });
  return produk;
};
