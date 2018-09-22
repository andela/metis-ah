
const readingStatistics = (sequelize, DataTypes) => {
  const ReadingStatistics = sequelize.define('ReadingStatistics', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    articleId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
        as: 'articleId'
      }
    },
  });

  ReadingStatistics.associate = (models) => {
    // associations can be defined here
    ReadingStatistics.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    ReadingStatistics.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return ReadingStatistics;
};

export default readingStatistics;
