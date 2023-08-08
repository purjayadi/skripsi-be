/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pesan: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      pengirim: {
        type: Sequelize.STRING
      },
      penerima: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      kuantiti_total: {
        type: Sequelize.INTEGER
      },
      total_akhir: {
        type: Sequelize.INTEGER
      },
      pembayaran: {
        type: Sequelize.INTEGER
      },
      id_status: {
        type: Sequelize.INTEGER
      },
      pesan_at: {
        type: Sequelize.DATE
      },
      kirim_at: {
        type: Sequelize.DATE
      },
      terima_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};
