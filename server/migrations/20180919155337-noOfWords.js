module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'noOfWords', {
    type: Sequelize.INTEGER,
    allowNull: false,
  }),

  down: queryInterface => queryInterface.removeColumn('Articles', 'noOfWords')
};
