module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'admin',
    email: 'metis.ah2018@gmail.com',
    password: '$2b$08$9//6nDTF3rLm/S.FcPIILONICsv5RCKbwgvZMYmK8I/ugG.JgoBxK',
    isVerified: true,
    roleId: 1,
    createdAt: '2018-09-19',
    updatedAt: '2018-09-19'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
