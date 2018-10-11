module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ArticleLikes', [{
    userId: 1,
    articleId: 5,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    articleId: 6,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 2,
    articleId: 6,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 5,
    articleId: 6,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 7,
    articleId: 6,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 4,
    articleId: 6,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    articleId: 5,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    articleId: 7,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    articleId: 7,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 4,
    articleId: 7,
    liked: true,
    disliked: false,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 7,
    articleId: 7,
    liked: true,
    disliked: false,
    createdAt: '2018-10-06',
    updatedAt: '2018-10-06'
  },
  {
    userId: 6,
    articleId: 6,
    liked: true,
    disliked: false,
    createdAt: '2018-10-06',
    updatedAt: '2018-10-06'
  },
  {
    userId: 7,
    articleId: 5,
    liked: true,
    disliked: false,
    createdAt: '2018-10-07',
    updatedAt: '2018-10-07'
  }]),
  down: queryInterface => queryInterface.bulkDelete('ArticleLikes')
};
