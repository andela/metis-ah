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
          return res.status(404).json({
            status: 'error',
            error: 'Notification does not exist'
          });
        }
        notify.isRead = true;
        notify.save()
          .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
        return res.status(200).json({
          status: 'success',
          notify
        });
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  },
  markAsRead: (req, res) => {
    const { readStatus } = req.body;

    Notifications
      .scope(null)
      .findByPk(req.params.notifyId)
      .then((notify) => {
        if (!notify) {
          return res.status(404).json({
            status: 'error',
            error: 'Notification does not exist'
          });
        }

        if (!readStatus || readStatus !== 'setAsRead') {
          return res.status(400).json({
            status: 'error',
            error: 'You need to set this notification as read'
          });
        }

        if (notify.isRead) {
          return res.status(406).json({
            status: 'error',
            error: 'Notification has all ready been marked as read',
            notify
          });
        }

        notify.isRead = true;
        notify.save()
          .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
        return res.status(200).json({
          status: 'success',
          message: 'Notification successfully marked as read',
          notify
        });
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
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
      .then(() => res.status(200).json({
        status: 'success',
        message: 'All notifications have been marked as read'
      }))
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  },
  clearHistory: (req, res) => {
    Notifications.scope(null)
      .destroy({
        where: {
          receiverId: req.currentUser.id
        }
      })
      .then((notifications) => {
        if (!notifications) {
          return res.status(404).json({
            status: 'error',
            error: 'No notifications found'
          });
        }
        res.status(200).json({
          status: 'success',
          message: 'All Notifications have been deleted'
        });
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  },
  clearOne: (req, res) => {
    const id = req.params.notifyId;
    const receiverId = req.currentUser.id;

    return Notifications.scope(null)
      .destroy({
        where: {
          id, receiverId
        }
      })
      .then((notifications) => {
        if (!notifications) {
          return res.status(404).json({
            status: 'error',
            error: 'No notifications found'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Notification deleted successfully'
        });
      })
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  },
  clearRead: (req, res) => {
    Notifications.scope('read')
      .destroy({
        where: {
          receiverId: req.currentUser.id
        }
      })
      .then(() => res.status(200).json({
        status: 'success',
        message: 'All read notifications have been deleted'
      }))
      .catch(() => res.status(500).jsend.error('Oops, something has gone wrong on the server'));
  }
};
export default notificationController;
