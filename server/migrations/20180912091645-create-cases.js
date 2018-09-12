module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      articleId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Articles',
          key: 'id',
          as: 'articleId'
        }
      },
      violation: {
        allowNull: false,
        type: Sequelize.ENUM('Discrimination', 'Plagiarism', 'Sexual Content', 'Offensive Language'),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resolved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cases');
  }
};
