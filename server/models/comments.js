const comments = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });

    Comments.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

    Comments.hasMany(models.Replies, {
      foreignKey: 'commentId',
      as: 'replies'
    });

    Comments.hasMany(models.CommentLikes, {
      foreignKey: 'commentId',
      as: 'likes'
    });

    Comments.hasMany(models.CommentHistory, {
      foreignKey: 'commentId',
      as: 'commentHistory'
    });
  };

  return Comments;
};

export default comments;
