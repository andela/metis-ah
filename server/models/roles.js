const roles = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM(
        'write',
        'read',
        'like',
        'rate',
        'report',
        'comment',
        'view report',
        'bookmark',
        'follow',
        'view cases',
        'view all users'
      )),
      allowNull: false
    }
  });

  Roles.associate = (models) => {
    Roles.hasMany(models.Users, {
      foreignKey: 'roleId',
      as: 'users'
    });
  };
  return Roles;
};

export default roles;
