import bcrypt from 'bcrypt';

const users = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    Users.hasMany(models.Followings, {
      foreignKey: 'followed',
      as: 'followings'
    });
    Users.hasMany(models.Replies, {
      foreignKey: 'userId',
      as: 'replies'
    });
    Users.hasOne(models.Subscriptions, {
      foreignKey: 'userId',
      as: 'subscription'
    });
  };
  Users.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 8);
  });
  Users.checkPassword = (password, user) => bcrypt.compareSync(password, user);
  return Users;
};

export default users;
