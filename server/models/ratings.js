const ratings = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Ratings.associate = (models) => {
    Ratings.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Ratings.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      as: 'article'
    });
  };
  return Ratings;
};

export default ratings;
