const comments = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: 'userId',
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
  };

  return Comments;
};

export default comments;
