module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      isIn: [[
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
      ]],
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Roles')
};
