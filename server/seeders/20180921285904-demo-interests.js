module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Interests', [{
    userId: 1,
    categoryId: 5,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 1,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 2,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 15,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    categoryId: 1,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 4,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 6,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 2,
    categoryId: 6,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 12,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 7,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 13,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 14,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 1,
    categoryId: 3,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    categoryId: 3,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  },
  {
    userId: 3,
    categoryId: 9,
    status: 'active',
    createdAt: '2018-10-08',
    updatedAt: '2018-10-08'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Interests')
};
