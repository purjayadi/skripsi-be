module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    await queryInterface.addColumn('Purchases', 'supplierId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Suppliers',
        key: 'id'
      }
    })
  ]),

  down: async (queryInterface) => Promise.all([
    await queryInterface.removeColumn('Purchases', 'supplierId')
  ])
};
