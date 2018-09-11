module.exports = (sequelize, DataTypes) => {
  const ArticlesTags = sequelize.define('ArticlesTags', {
    tagId: {
      type: DataTypes.INTEGER
    },
    articleId: {
      type: DataTypes.INTEGER
    }
  });
  ArticlesTags.associate = (models) => {
    ArticlesTags.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

    ArticlesTags.belongsTo(models.Tags, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE'
    });
  };
  return ArticlesTags;
};
