module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Replies', [{
    content: 'I would reply',
    edited: false,
    commentId: 1,
    userId: 1,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Replies')
};
