module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReplyHistory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    replyId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Replies',
        key: 'id',
        as: 'replyId'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { freezeTableName: true }),
  down: queryInterface => queryInterface.dropTable('ReplyHistory')
};
