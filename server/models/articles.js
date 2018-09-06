const articles = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  });

  Articles.associate = (models) => {
    Articles.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Articles.belongsTo(models.Categories, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    Articles.hasMany(models.Comments, {
      foreignKey: 'articleId',
      as: 'comments'
    });

    Articles.hasMany(models.Favourites, {
      foreignKey: 'articleId',
      as: 'favourites'
    });

    Articles.belongsToMany(models.Tags, {
      as: 'articleTags',
      through: 'Tagging',
      foreignKey: 'articleId'
    });
  };

  return Articles;
};

export default articles;
