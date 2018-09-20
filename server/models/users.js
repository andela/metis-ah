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
    wordsPerMinute: {
      type: DataTypes.INTEGER,
      defaultValue: 200
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
      as: 'articleLikes'
    });
  };
  Users.beforeCreate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });
  Users.checkPassword = (password, user) => bcrypt.compareSync(password, user);
  return Users;
};

export default users;
