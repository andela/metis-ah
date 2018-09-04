const favourites = (sequelize, DataTypes) => {
  const Favourites = sequelize.define('Favourites', {
    userId: {
      type: DataTypes.INTEGER
    },
    articleId: {
      type: DataTypes.INTEGER
    }
  });

  Favourites.associate = (models) => {
    Favourites.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Favourites.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Favourites;
};
export default favourites;
