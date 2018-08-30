const categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { freezeTableName: true });

  Categories.associate = (models) => {
    Categories.hasMany(models.Articles, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  };

  return Categories;
};

export default categories;
