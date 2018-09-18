module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tags', [{
    name: 'SomethingFishy',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'CodeForALiving',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'IAmMe',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Purposefulness',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'GoalGetter',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Tags')
};
