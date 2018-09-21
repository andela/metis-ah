const replyHistory = (sequelize, DataTypes) => {
  const ReplyHistory = sequelize.define('ReplyHistory', {
    content: {
      type: DataTypes.STRING
    },
    replyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true });

  ReplyHistory.associate = (models) => {
    ReplyHistory.belongsTo(models.Replies, {
      foreignKey: 'replyId',
      onDelete: 'CASCADE'
    });
  };

  return ReplyHistory;
};

export default replyHistory;
