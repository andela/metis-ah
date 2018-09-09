module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Ratings', [{
    rating: 1,
    userId: 1,
    articleId: 1,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Ratings', null, {})
};
