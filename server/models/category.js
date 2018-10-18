const categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Categories.associate = (models) => {
    Categories.hasMany(models.Articles, {
      foreignKey: 'categoryId',
      as: 'articles'
    });
    Categories.hasMany(models.Articles, {
      foreignKey: 'categoryId',
      as: 'count'
    });
  };

  return Categories;
};

export default categories;
