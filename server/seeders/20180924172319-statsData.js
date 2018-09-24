const now = new Date();

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ReadingStatistics', [{
    userId: 1,
    articleId: 2,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 1)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 1))
  },
  {
    userId: 1,
    articleId: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 2)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 2))
  },
  {
    userId: 1,
    articleId: 5,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 6)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 6))
  },
  {
    userId: 1,
    articleId: 3,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 10)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 10))
  },
  {
    userId: 1,
    articleId: 1,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 28)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 28))
  },
  {
    userId: 1,
    articleId: 6,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 52)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 52))
  },
  {
    userId: 3,
    articleId: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 68)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 68))
  }]),

  down: queryInterface => queryInterface.bulkDelete('ReadingStatistics')
};
