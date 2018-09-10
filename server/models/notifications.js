module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    receiverId: {
      type: DataTypes.INTEGER
    },
    actorId: {
      type: DataTypes.INTEGER
    },
    action: {
      type: DataTypes.STRING
    },
    notifiable: {
      type: DataTypes.STRING
    },
    notifiableId: {
      type: DataTypes.INTEGER
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  },
  {
    defaultScope: {
      where: {
        isRead: false
      }
    },
    scopes: {
      read: {
        where: {
          isRead: true
        }
      },
      unread: {
        where: {
          isRead: false
        }
      }
    }
  });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Users, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    });
    Notifications.belongsTo(models.Users, {
      foreignKey: 'actorId',
      as: 'actor'
    });
    Notifications.belongsTo(models.Articles, {
      foreignKey: 'notifiableId',
      constraints: false,
      as: 'article'
    });
    Notifications.belongsTo(models.Comments, {
      foreignKey: 'notifiableId',
      constraints: false,
      as: 'comment'
    });
    Notifications.belongsTo(models.Followings, {
      foreignKey: 'notifiableId',
      constraints: false,
      as: 'followings'
    });
  };

  return Notifications;
};
