module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bio: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
    },
    premium: {
      type: Sequelize.BOOLEAN
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    interests: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { freezeTableName: true }),
  down: queryInterface => queryInterface.dropTable('Users')
};
