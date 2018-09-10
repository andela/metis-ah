const liker = (model, response, likeData, type) => {
  model
    .findOrCreate({ where: likeData, defaults: { liked: true } })
    .spread((result, created) => {
      const { liked } = result.dataValues;

      // When user is liking for the first time
      if (liked && created) {
        return response.status(201).jsend.success({
          message: `${type} liked`
        });
      }

      // The two if blocks below toggle the like functionality
      // this runs when a user unlikes
      if (liked) {
        return model
          .update({ liked: false }, { where: likeData })
          .then(() => response.status(200).jsend.success({
            message: `${type} unliked`
          }));
      }

      // this runs when the user decides to like again
      return model
        .update({ liked: true }, { where: likeData })
        .then(() => response.status(200).jsend.success({
          message: `${type} liked`
        }));
    })
    .catch(error => response.status(500).jsend.error(error));
};

export default liker;

