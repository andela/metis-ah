module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    username: 'John-Doe',
    email: 'john.doe@ah.com',
    isVerified: true,
    interests: ['Dancing', 'Java'],
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
