module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ArticlesTags', [{
    articleId: 1,
    tagId: 1,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    articleId: 2,
    tagId: 2,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    articleId: 2,
    tagId: 1,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }]),
  down: queryInterface => queryInterface.bulkDelete('ArticlesTags')
};
