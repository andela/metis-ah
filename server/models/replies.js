const replies = (sequelize, DataTypes) => {
  const Replies = sequelize.define('Replies', {
    content: {
      type: DataTypes.STRING
    }
  }, { freezeTableName: true });

  Replies.associate = (models) => {
    Replies.belongsTo(models.Comments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });
  };

  return Replies;
};

export default replies;
