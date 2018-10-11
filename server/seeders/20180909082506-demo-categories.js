module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [{
    name: 'Fashion',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Programming',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Mathematics',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Business',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Entertainment',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'It has become appallingly obvious that our technology has exceeded our humanity.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Categories')
};
