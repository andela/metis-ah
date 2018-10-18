module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [{
    name: 'FASHION',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539947552/eroooo_1.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'PROGRAMMING',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539660484/pexels-photo-436784.jpg',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'MATHEMATICS',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539660484/pexels-photo-436784.jpg',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'BUSINESS',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539947552/eroooo_1.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'ENTERTAINMENT',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539660484/pexels-photo-436784.jpg',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'POLITICS',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539660484/pexels-photo-436784.jpg',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'CULTURE',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539660484/pexels-photo-436784.jpg',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Categories')
};
