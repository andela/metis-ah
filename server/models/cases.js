const cases = (sequelize, DataTypes) => {
  const Cases = sequelize.define('Cases', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    violation: {
      type: DataTypes.ENUM('Discrimination', 'Plagiarism', 'Sexual Content', 'Offensive Language'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Cases.associate = (models) => {
    Cases.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Cases.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'NO ACTION'
    });
  };

  return Cases;
};

export default cases;
