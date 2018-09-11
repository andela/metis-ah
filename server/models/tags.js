const tags = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    name: DataTypes.STRING
  });

  Tags.associate = (models) => {
    Tags.belongsToMany(models.Articles, {
      as: 'articles',
      through: models.ArticlesTags,
      foreignKey: 'tagId'
    });
  };

  return Tags;
};

export default tags;
