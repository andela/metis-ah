import Pusher from 'pusher';
import dotenv from 'dotenv';
import models from '../models';

// import models
const {
  Notifications,
  Users,
  Articles,
  ArticleLikes
} = models;

dotenv.config();

// initializing pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});
const notify = {
  /**
   * @description Creates a bulk of notifications
   * @param  {object} res response
   * @param  {object} notifiable notifiable object
   * @returns {object} null
   */
  createNotifications: (res, notifiable) => {
    Notifications
      .bulkCreate(notifiable)
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  },

  /**
  * @description Creates notifications for users
  * @param  {object} res response
  * @param  {object} req resquest
  * @param  {object} notifiable notifiable object
  * @returns {object} null
  */
  multiNotifications: (res, req, notifiable) => {
    Users
      .findOne({ where: { id: req.currentUser.id }, include: ['followed'] })
      .then((user) => {
        const bulkData = [];
        user.followed.forEach((followed) => {
          bulkData.push({
            receiverId: followed.dataValues.id,
            actorId: req.currentUser.id,
            action: `${user.dataValues.username} created an article titled: ${notifiable.title}`,
            notifiable: 'article',
            notifiableId: notifiable.id
          });
          notify.push(`notify-${followed.dataValues.id}`,
            `channel-${followed.dataValues.id}`,
            { message: `${user.dataValues.username} created an article titled: ${notifiable.title}` });
        });
        if (bulkData.length !== 0) {
          notify.createNotifications(res, bulkData);
        }
      })
      .catch(() => res.status(500).jsend.error({ message: 'we could not get you details at this time . Please try again' }));
  },

  /**
  * @description Creates notifications for users
  * @param  {object} res response
  * @param  {object} req resquest
  * @param  {integer} modelId model id
  * @param  {string} excerpt message excerpt
  * @returns {object} null
  */
  multiEventNotifications: (res, req, modelId, excerpt) => {
    const includes = {
      articleLikes: {
        model: ArticleLikes,
        as: 'articleLikes',
        include: [
          {
            model: Users,
            as: 'userLikes'
          }
        ]
      }
    };
    Articles
      .findOne({ where: { id: modelId }, include: [includes.articleLikes] })
      .then((article) => {
        const bulkData = [];
        const receivers = article.articleLikes
          .filter(filter => filter.dataValues.userId !== req.currentUser.id
          && filter.dataValues.userId !== article.userId);

        receivers.forEach((included) => {
          bulkData.push({
            receiverId: included.dataValues.userId,
            actorId: req.currentUser.id,
            action: `${req.currentUser.username} ${excerpt} ${article.title}`,
            notifiable: 'article',
            notifiableId: article.id
          });
          notify.push(`notify-${included.dataValues.userId}`,
            `channel-${included.dataValues.userId}`,
            { message: `${req.currentUser.username} ${excerpt} ${article.title}` });
        });
        bulkData.push({
          receiverId: article.userId,
          actorId: req.currentUser.id,
          action: `${req.currentUser.username} ${excerpt} ${article.title}`,
          notifiable: 'article',
          notifiableId: article.id
        });
        notify.push(`notify-${article.userId}`,
          `channel-${article.userId}`,
          { message: `${req.currentUser.username} ${excerpt} ${article.title}` });
        if (bulkData.length !== 0) {
          notify.createNotifications(res, bulkData);
        }
      })
      .catch((err) => { res.status(500).jsend.error({ message: err }); });
  },

  /**
  * @description Creates notifications for a single user
  * @param  {object} res response
  * @param  {object} req resquest
  * @param  {integer} userId user id
  * @returns {object} null
  */
  SingleUserNotification: (res, req, userId) => {
    Users
      .findOne({ where: { id: req.currentUser.id } })
      .then((user) => {
        notify.createNotifications(res, [{
          receiverId: userId,
          actorId: user.id,
          action: `${user.username} is now following you`,
          notifiable: 'user',
          notifiableId: user.id
        }]);
        notify.push(`notify-${userId}`,
          `channel-${userId}`,
          { message: `${user.username} is now following you` });
      })
      .catch(() => res.status(500).jsend.error({ message: 'we could not get you details at this time . Please try again' }));
  },
  /**
   * @description Function to push notification
   * @param  {string} channel
   * @param  {string} topic
   * @param  {object} payload
   * @param  {object} socketId
   * @returns {object} notification
   */
  push: (channel, topic, payload) => {
    pusher.trigger(channel, topic, payload);
  }
};
export default notify;
