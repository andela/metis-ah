import models from '../models';
import notify from './notify';

const { Users } = models;

const commentHelpers = {
  liker: (model, response, likeData, type) => {
    model
      .findOrCreate({ where: likeData, defaults: { liked: true } })
      .spread((result, created) => {
        const { liked } = result.dataValues;

        // When user is liking for the first time
        if (created) {
          return response.status(201).jsend.success({
            message: `${type} liked`
          });
        }

        // This block creates the toggle effect of liking and unliking
        return model
          .update({ liked: !liked }, { where: likeData })
          .then(() => response.status(200).jsend.success({
            message: `${type} ${liked ? 'reaction removed' : 'liked'}`
          }));
      })
      .catch(error => response.status(500).jsend.error(error));
  },
  commenter: async (response, model, historyModel, userComment, type, request, articleId) => {
    const historyOptions = { content: userComment.content };

    try {
      const comment = await model.create(userComment);

      if (type === 'Reply') {
        historyOptions.replyId = comment.dataValues.id;
      } else {
        historyOptions.commentId = comment.dataValues.id;
      }

      await historyModel.create(historyOptions);
      const user = await Users.findById(userComment.userId, {
        attributes: ['id', 'username', 'firstname', 'lastname', 'image']
      });
      comment.dataValues.user = user;

      notify.multiEventNotifications(
        response,
        request,
        articleId,
        'commented on the article:'
      );
      return response.status(201).jsend.success({ comment });
    } catch (error) {
      return response.status(500).jsend.error({
        message: 'There was a problem',
        error
      });
    }
  },
  updater: async (response, model, historyModel, reqData, type) => {
    const contentId = reqData.commentId || reqData.replyId;
    const { content } = reqData;

    try {
      const comment = await model.findById(contentId);

      if (content === comment.dataValues.content) {
        return response.status(200).jsend.success({
          message: `${type} is the same, no change was effected`
        });
      }

      await model.update({ content, edited: true }, { where: { id: contentId } });
      await historyModel.create(reqData);

      return response.status(200).jsend.success({
        message: `${type} updated`,
        content
      });
    } catch (error) {
      return response.status(500).jsend.error({
        message: 'There was a problem processing your request',
        error
      });
    }
  }
};

export default commentHelpers;
