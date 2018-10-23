const replies = (sequelize, DataTypes) => {
  const Replies = sequelize.define('Replies', {
    content: {
      type: DataTypes.STRING
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Replies.associate = (models) => {
    Replies.belongsTo(models.Comments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });

    Replies.hasMany(models.ReplyLikes, {
      foreignKey: 'replyId',
      as: 'likes'
    });

    Replies.hasMany(models.ReplyHistory, {
      foreignKey: 'replyId',
      as: 'replyHistory'
    });
  };

  return Replies;
};

export default replies;
