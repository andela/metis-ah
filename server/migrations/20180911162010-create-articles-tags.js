module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticlesTags', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tagId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        key: 'id'
      }
    },
    articleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles',
        key: 'id'
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

  down: queryInterface => queryInterface.dropTable('ArticlesTags')
};
