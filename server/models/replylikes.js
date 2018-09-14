const replyLikes = (sequelize, DataTypes) => {
  const ReplyLikes = sequelize.define('ReplyLikes', {
    replyId: {
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

  ReplyLikes.associate = (models) => {
    ReplyLikes.belongsTo(models.Replies, {
      foreignKey: 'replyId',
      onDelete: 'CASCADE',
      as: 'likes'
    });

    ReplyLikes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return ReplyLikes;
};

export default replyLikes;
