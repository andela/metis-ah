const subscriptions = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('Subscriptions', {
    status: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.INTEGER
    }
  });

  Subscriptions.associate = (models) => {
    Subscriptions.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Subscriptions;
};

export default subscriptions;
