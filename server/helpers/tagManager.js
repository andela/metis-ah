/**
   * @description Function to create tags from array of strings
   * and add them to the article.
   * @param  {object} res
   * @param  {Array} tagsArray
   * @param  {Model} tagsModel
   * @param  {Model instance} article
   * @returns {object} undefined
   */const tagManager = {
  createTag: (res, tagsArray, tagsModel, article) => {
    tagsArray.forEach((tag) => {
      tagsModel
        .findOrCreate({
          where: {
            name: tag
          }
        })
        .spread((createdTag) => article.addTags(createdTag))
        .catch(() => res.status(500).jsend.fail({ message: 'Something, went wrong. please try again' }));
    });
  }
};

export default tagManager;
