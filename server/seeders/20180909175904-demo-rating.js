module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Ratings', [{
    rating: 1,
    userId: 2,
    articleId: 2,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    rating: 2,
    userId: 4,
    articleId: 1,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    rating: 3,
    userId: 4,
    articleId: 12,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    rating: 4,
    userId: 4,
    articleId: 10,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Ratings')
};
