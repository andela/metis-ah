const articleTags = (sequelize, DataTypes) => {
  const ArticleTags = sequelize.define('ArticleTags', {
    articleId: {
      type: DataTypes.INTEGER
    },
    tagId: {
      type: DataTypes.INTEGER
    }
  });

  ArticleTags.associate = (models) => {
    ArticleTags.belongsTo(models.Articles, {
      foreignKey: 'articleId'
    });

    ArticleTags.belongsTo(models.Tags, {
      foreignKey: 'tagId',
    });
  };

  return ArticleTags;
};

export default articleTags;
