module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    role: 'admin',
    permissions: [
      'write',
      'read',
      'like',
      'rate',
      'report',
      'comment',
      'view report',
      'bookmark',
      'follow',
      'view cases',
      'view all users'
    ],
    createdAt: '2018-09-20',
    updatedAt: '2018-09-20'
  }, {
    role: 'user',
    permissions: [
      'write',
      'read',
      'like',
      'rate',
      'report',
      'comment',
      'view report',
      'bookmark',
      'follow'
    ],
    createdAt: '2018-09-20',
    updatedAt: '2018-09-20'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
