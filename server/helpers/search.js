const search = {
  getIds: (model, where) => model.all({
    where,
    attributes: ['id']
  })
    .then(results => results.map(result => result.dataValues.id)),
  searcher: (res, model, queryOptions, currentPage, type, searchQuery) => {
    const { limit } = queryOptions;

    model
      .findAndCountAll(queryOptions)
      .then((searchResult) => {
        const { count } = searchResult;
        const totalPages = Math.ceil(count / limit);

        if (searchResult.count < 1) {
          return res.status(404).jsend.fail({
            message: `No results for the ${type} "${searchQuery}"`
          });
        }

        if (currentPage > totalPages) {
          return res.status(404).jsend.fail({
            message: `End of results for the ${type} "${searchQuery}"`,
            searchResult,
            pageInfo: { currentPage, totalPages }
          });
        }
        return res.status(200).jsend.success({
          message: `Search results for the ${type} "${searchQuery}"`,
          searchResult,
          pageInfo: { currentPage, totalPages }
        });
      })
      .catch(error => res.status(500).jsend.error(error));
  }
};

export default search;
