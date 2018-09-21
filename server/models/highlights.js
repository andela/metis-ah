const hightlights = (sequelize, DataTypes) => {
  const Highlights = sequelize.define('Highlights', {
    highlightedText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING
    }
  });
  Highlights.associate = (models) => {
    Highlights.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Highlights.belongsTo(models.Users, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
    Highlights.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      as: 'articles',
      onDelete: 'CASCADE'
    });
  };
  return Highlights;
};

export default hightlights;
