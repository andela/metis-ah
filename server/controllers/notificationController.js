import models from '../models';

const { Notifications } = models;

const notificationController = {
  /**
  * @description notification controller
  * @param  {object} req The HTTP request object
  * @param  {object} res The HTTP response object
  * @returns {object} The HTTP response object
  */
  getUnreadAll: (req, res) => {
    Notifications
      .findAll({
        where: {
          receiverId: req.currentUser.id
        }
      })
      .then((notifications) => {
        const count = notifications.length;
        return res.status(200).jsend.success({
          count,
          notifications
        });
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  },
  getAll: (req, res) => {
    Notifications.scope(null)
      .findAll({
        where: {
          receiverId: req.currentUser.id
        }
      })
      .then((notifications) => {
        const count = notifications.length;
        return res.status(200).jsend.success({
          count,
          notifications
        });
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  },
  getOne: (req, res) => {
    Notifications.scope(null)
      .findOne({
        where: {
          id: req.params.notifyId,
          receiverId: req.currentUser.id
        }
      })
      .then((notify) => {
        if (!notify) {
          return res.redirect('/api/v1/notifications');
        }
        notify.isRead = true;
        notify.save()
          .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
        const route = {
          article: `/api/v1/articles/${notify.notifiableId}`,
          user: `/api/v1/users/${notify.notifiableId}`,
        };
        return res.redirect(route[notify.notifiable]);
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  },
  markAsRead: (req, res) => {
    Notifications
      .findById(req.params.notifyId)
      .then((notify) => {
        if (!notify) {
          return res.redirect('/api/v1/notifications');
        }

        notify.isRead = true;
        notify.save()
          .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
        return res.redirect('/api/v1/notifications');
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  },
  markAllAsRead: (req, res) => {
    Notifications
      .update(
        {
          isRead: true
        },
        {
          where: {
            receiverId: req.currentUser.id
          },
        }
      )
      .then(() => res.redirect('/api/v1/notifications'))
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  },
  clearHistory: (req, res) => {
    Notifications
      .destroy(
        {
          where: {
            receiverId: req.currentUser.id
          }
        }
      )
      .then(() => res.redirect('/api/v1/notifications'))
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  },
  clearOne: (req, res) => {
    Notifications
      .destroy(
        {
          where: {
            receiverId: req.currentUser.id,
            id: req.params.notifyId
          }
        }
      )
      .then(() => res.redirect('/api/v1/notifications'))
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  },
  clearRead: (req, res) => {
    Notifications.scope('read')
      .destroy(
        {
          where: {
            receiverId: req.currentUser.id
          }
        }
      )
      .then(() => res.redirect('/api/v1/notifications'))
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the serve'));
  }
};
export default notificationController;
