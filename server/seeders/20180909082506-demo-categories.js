module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [{
    name: 'Fashion',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Programming',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Mathematics',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Business',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Entertainment',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Categories')
};
