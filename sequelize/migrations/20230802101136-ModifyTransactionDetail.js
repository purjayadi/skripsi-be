module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    await queryInterface.addColumn('TransactionDetails', 'price', {
      type: Sequelize.DECIMAL
    }),
    await queryInterface.addColumn('TransactionDetails', 'unitId', {
      type: Sequelize.UUID,
      references: {
        model: 'Units',
        key: 'id'
      }
    }),
    await queryInterface.removeColumn('TransactionDetails', 'purchasePrice'),
    await queryInterface.removeColumn('TransactionDetails', 'sellingPrice')
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    await queryInterface.removeColumn('TransactionDetails', 'price'),
    await queryInterface.removeColumn('TransactionDetails', 'unitId'),
    await queryInterface.addColumn('TransactionDetails', 'purchasePrice', {
      type: Sequelize.DECIMAL
    }),
    await queryInterface.addColumn('TransactionDetails', 'sellingPrice', {
      type: Sequelize.DECIMAL
    })
  ])
};
