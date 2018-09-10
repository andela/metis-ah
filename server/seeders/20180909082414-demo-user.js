const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    username: 'John-Doe',
    email: 'john.doe@ah.com',
    password: bcrypt.hashSync('johnDSoe', 8),
    isVerified: true,
    interests: ['Dancing', 'Java'],
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    username: 'John-Stone',
    email: 'john.stone@ah.com',
    password: bcrypt.hashSync('johnSSoe', 8),
    isVerified: true,
    interests: ['Dancing', 'Java'],
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
