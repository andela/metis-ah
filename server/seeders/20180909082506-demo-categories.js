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
  },
  {
    name: 'Education',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'Our Education does not need to be reformed; it needs to be rebirthed.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Agriculture',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'The next generation millionaires would be Agriculturists',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Science',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'Data is the new currency',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Culture',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'South Africa to experience another round of Apatheid',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Career',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'Work-life balance no longer prevails; work-life integration is the new language.',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  },
  {
    name: 'Soul',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'How often do you meditate?',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Psychology',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'Magic and mentalism; where do we draw the line?',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Politics',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: '2019 is close, we are set to make yet another wrong decision',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Sports',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'Abrahamovic makes moves towards buying Enyimba Club of Aba',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }, {
    name: 'Commedy',
    poster: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539444927/xuednsow5shjuv28hz4e.png',
    description: 'Female kangaroo spotted at the White House',
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }]),

  down: queryInterface => queryInterface.bulkDelete('Categories')
};
