module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'postman',
    email: 'postman@gmail.com',
    password: '$2b$08$Oei0G0AOs5ZflnVQorfW3evz2a.L3IHKWQVaNd0OP0mTUPS2NEfPq',
    isVerified: true,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    username: 'postman2',
    email: 'postman2@gmail.com',
    password: '$2b$08$Oei0G0AOs5ZflnVQorfW3evz2a.L3IHKWQVaNd0OP0mTUPS2NEfPq',
    isVerified: false,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    username: 'johndoe',
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
    password: '$2b$08$VP6rjvrJ./iCpYoR1eb5ueeHv0za.HNmkRs2pcFaOO.bDSwX0fWcC',
    bio: 'I like to eat',
    image: 'someimgurl',
    premium: true,
    isVerified: true,
    interests: ['Entertainment', 'Science'],
    createdAt: '2018-09-05',
    updatedAt: '2018-09-05'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Users')
};
