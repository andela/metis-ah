const interests = (sequelize, DataTypes) => {
  const Interests = sequelize.define('Interests', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    }
  });

  Interests.associate = (models) => {
    Interests.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Interests.belongsTo(models.Categories, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
  };
  return Interests;
};

export default interests;
