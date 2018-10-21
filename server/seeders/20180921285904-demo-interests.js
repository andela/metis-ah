module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Interests', [{
    userId: 1,
    categoryId: 5,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 1,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 2,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 15,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    categoryId: 1,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 4,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 6,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 2,
    categoryId: 6,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 12,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 7,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 13,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 14,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 3,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    categoryId: 3,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    categoryId: 9,
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Interests')
};
