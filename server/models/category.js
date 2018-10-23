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
    Categories.belongsToMany(models.Users, {
      through: models.Interests,
      foreignKey: 'categoryId',
      as: 'interests'
    });
    Categories.hasMany(models.Interests, {
      foreignKey: 'categoryId',
      as: 'userInterests'
    });
  };

  return Categories;
};

export default categories;
