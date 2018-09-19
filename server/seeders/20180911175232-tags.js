module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tags', [{
    name: 'javascript',
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    name: 'nodejs',
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Tags')
};
