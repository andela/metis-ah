const users = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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
  }, { freezeTableName: true });

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

  return Users;
};

export default users;
