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
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
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

    Articles.hasMany(models.Cases, {
      foreignKey: 'articleId',
      as: 'cases'
    });

    Articles.hasMany(models.Comments, {
      foreignKey: 'articleId',
      as: 'comments'
    });

    Articles.hasMany(models.Favourites, {
      foreignKey: 'articleId',
      as: 'favourites'
    });

    Articles.hasMany(models.ArticleLikes, {
      foreignKey: 'articleId',
      as: 'articleLikes'
    });

    Articles.belongsToMany(models.Tags, {
      as: 'tags',
      through: models.ArticlesTags,
      foreignKey: 'articleId'
    });

    Articles.hasMany(models.Ratings, {
      foreignKey: 'articleId',
      as: 'ratings'
    });
  };

  return Articles;
};

export default articles;
