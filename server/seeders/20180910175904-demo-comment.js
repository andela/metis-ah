module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Comments', [{
    content: 'Your post sucks',
    edited: false,
    articleId: 1,
    userId: 1,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Comments')
};
