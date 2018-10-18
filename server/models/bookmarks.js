const bookmarks = (sequelize, DataTypes) => {
  const Bookmarks = sequelize.define('Bookmarks', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Bookmarks.associate = (models) => {
    Bookmarks.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Bookmarks.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      as: 'articles'
    });
  };

  return Bookmarks;
};

export default bookmarks;
