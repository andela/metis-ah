const articleLikes = (sequelize, DataTypes) => {
  const ArticleLikes = sequelize.define('ArticleLikes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    disliked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  ArticleLikes.associate = (models) => {
    ArticleLikes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    ArticleLikes.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return ArticleLikes;
};

export default articleLikes;
