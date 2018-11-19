module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [{
    receiverId: 1,
    actorId: 2,
    notifiable: 'articles',
    notifiableId: 2,
    isRead: true,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    receiverId: 1,
    actorId: 3,
    notifiable: 'articles',
    notifiableId: 4,
    isRead: false,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    receiverId: 1,
    actorId: 4,
    notifiable: 'articles',
    notifiableId: 3,
    isRead: false,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    receiverId: 1,
    actorId: 2,
    notifiable: 'articles',
    notifiableId: 1,
    isRead: false,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  {
    receiverId: 1,
    actorId: 8,
    notifiable: 'articles',
    notifiableId: 5,
    isRead: false,
    createdAt: '2018-09-08',
    updatedAt: '2018-09-08'
  },
  ]),

  down: queryInterface => queryInterface.bulkDelete('Notifications')
};
