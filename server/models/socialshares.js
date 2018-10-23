const socialShares = (sequelize, DataTypes) => {
  const SocialShares = sequelize.define('SocialShares', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sharedPlatform: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  SocialShares.associate = (models) => {
    SocialShares.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    SocialShares.belongsTo(models.Users, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });

    SocialShares.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return SocialShares;
};

export default socialShares;
