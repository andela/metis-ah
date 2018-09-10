
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'username',
    email: 'username@gmail.com',
    password: 'bouhsiudgsd',
    isVerified: true,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09',
  }]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
