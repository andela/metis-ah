const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'postman',
    firstname: 'Daniel',
    lastname: 'Adekunle',
    email: 'postman@gmail.com',
    password: '$2b$08$Oei0G0AOs5ZflnVQorfW3evz2a.L3IHKWQVaNd0OP0mTUPS2NEfPq',
    image: 'https://res.cloudinary.com/enking/image/upload/v1539537499/daniel.jpg',
    isVerified: true,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    username: 'postman2',
    firstname: 'Ikechukwu',
    lastname: 'Orji',
    email: 'postman2@gmail.com',
    password: '$2b$08$Oei0G0AOs5ZflnVQorfW3evz2a.L3IHKWQVaNd0OP0mTUPS2NEfPq',
    image: 'https://res.cloudinary.com/enking/image/upload/v1539537501/orji.jpg',
    isVerified: false,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    username: 'johndoe',
    firstname: 'John',
    lastname: 'Obi',
    email: 'johndoe@gmail.com',
    password: '$2b$08$VP6rjvrJ./iCpYoR1eb5ueeHv0za.HNmkRs2pcFaOO.bDSwX0fWcC',
    bio: 'I like to eat',
    image: 'https://res.cloudinary.com/enking/image/upload/v1539537500/john.jpg',
    premium: true,
    isVerified: true,
    interests: ['Entertainment', 'Science'],
    createdAt: '2018-09-05',
    updatedAt: '2018-09-05'
  },
  {
    username: 'johnsmith',
    firstname: 'Jehonadab',
    lastname: 'Okpukoro',
    email: 'smith@gmail.com',
    password: bcrypt.hashSync('Password', 8),
    bio: 'I like to eat',
    image: 'https://res.cloudinary.com/enking/image/upload/v1539537498/jehonadab.jpg',
    premium: true,
    isVerified: true,
    interests: ['Entertainment', 'Science'],
    createdAt: '2018-09-05',
    updatedAt: '2018-09-05'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Users')
};
