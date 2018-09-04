const followings = (sequelize, DataTypes) => {
  const Followings = sequelize.define('Followings', {
    followed: {
      type: DataTypes.INTEGER
    },
    follower: {
      type: DataTypes.INTEGER
    }
  });

  Followings.associate = (models) => {
    Followings.belongsTo(models.Users, {
      foreignKey: 'followed',
      onDelete: 'CASCADE'
    });

    Followings.belongsTo(models.Users, {
      foreignKey: 'follower',
      onDelete: 'CASCADE'
    });
  };

  return Followings;
};

export default followings;
