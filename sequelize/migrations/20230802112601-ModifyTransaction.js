module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    await queryInterface.addColumn('Transactions', 'type', {
      type: Sequelize.ENUM('Ritel', 'Grosir')
    })
  ]),

  down: async (queryInterface) => Promise.all([
    await queryInterface.removeColumn('Transactions', 'type')
  ])
};
