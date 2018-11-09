import bcrypt from 'bcrypt';

const users = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    premium: {
      type: DataTypes.BOOLEAN
    },
    isVerified: {
      type: DataTypes.BOOLEAN
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.Articles, {
      foreignKey: 'userId',
      as: 'articles'
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'userId',
      as: 'comments'
    });
    Users.hasMany(models.Favourites, {
      foreignKey: 'userId',
      as: 'favourites'
    });
    Users.belongsToMany(Users, {
      as: 'follower',
      through: models.Followings,
      foreignKey: 'follower',
    });
    Users.belongsToMany(Users, {
      as: 'followed',
      through: models.Followings,
      foreignKey: 'followed',
    });
    Users.hasMany(models.Replies, {
      foreignKey: 'userId',
      as: 'replies'
    });
    Users.hasMany(models.Cases, {
      foreignKey: 'userId'
    });
    Users.hasOne(models.Subscriptions, {
      foreignKey: 'userId',
      as: 'subscription'
    });
    Users.hasMany(models.Ratings, {
      foreignKey: 'userId',
      as: 'ratings'
    });
    Users.hasMany(models.ArticleLikes, {
      foreignKey: 'userId',
      as: 'userLikes'
    });
    Users.hasMany(models.Notifications, {
      foreignKey: 'receiverId',
      as: 'notifications'
    });
    Users.hasMany(models.Notifications, {
      foreignKey: 'actorId'
    });
    Users.hasMany(models.Bookmarks, {
      foreignKey: 'userId',
      as: 'bookmarks'
    });
    Users.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      as: 'role'
    });
    Users.belongsToMany(models.Categories, {
      through: models.Interests,
      foreignKey: 'userId',
      as: 'categoryInterests'
    });
    Users.hasMany(models.Interests, {
      foreignKey: 'userId',
      as: 'userInterests'
    });
    Users.hasMany(models.SocialShares, {
      foreignKey: 'userId',
      as: 'mySocialShares'
    });
    Users.hasMany(models.SocialShares, {
      foreignKey: 'authorId',
      as: 'SocialShares'
    });
  };
  Users.beforeValidate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });
  Users.checkPassword = (password, user) => bcrypt.compareSync(password, user);
  return Users;
};

export default users;
