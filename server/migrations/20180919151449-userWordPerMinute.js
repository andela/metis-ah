module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'wordsPerMinute', {
    type: Sequelize.INTEGER,
    defaultValue: 200
  }),

  down: queryInterface => queryInterface.removeColumn('Users', 'wordsPerMinute')
};
