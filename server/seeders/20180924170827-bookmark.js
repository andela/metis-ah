module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Bookmarks', [{
    title: 'Plan well and practice more',
    userId: 1,
    articleId: 1,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Bookmarks')
};
