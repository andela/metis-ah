const commentHistory = (sequelize, DataTypes) => {
  const CommentHistory = sequelize.define('CommentHistory', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true });

  CommentHistory.associate = (models) => {
    CommentHistory.belongsTo(models.Comments, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return CommentHistory;
};

export default commentHistory;
