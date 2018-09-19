module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'tagger',
    email: 'tagger@gmail.com',
    password: '$2b$08$Hkj0DXWIk0k/M3lTZWx/luvSTBY3d1DeArh2Zp6SruHoDtMJiBXfS',
    isVerified: true,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Users')
};
