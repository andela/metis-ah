const commentLikes = (sequelize, DataTypes) => {
  const CommentLikes = sequelize.define('CommentLikes', {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  CommentLikes.associate = (models) => {
    CommentLikes.belongsTo(models.Comments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
      as: 'likes'
    });

    CommentLikes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return CommentLikes;
};

export default commentLikes;
