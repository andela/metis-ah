module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Ratings', [{
    rating: 1,
    userId: 2,
    articleId: 1,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Ratings')
};
