

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'postman',
    email: 'postman@gmail.com',
    password: '$2b$08$Oei0G0AOs5ZflnVQorfW3evz2a.L3IHKWQVaNd0OP0mTUPS2NEfPq',
    isVerified: true,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Users')
};
