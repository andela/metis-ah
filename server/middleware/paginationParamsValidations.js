const paginationParamsValidations = (req, res, next) => {
  // VALIDATE PAGE NUMBER
  let page = parseInt(req.query.page, 10);
  if (!Number.isInteger(page) || page < 1) {
    page = 1;
  }
  // VALIDATE LIMIT NUMBER
  let limit = parseInt(req.query.limit, 10);
  if (!Number.isInteger(limit) || limit < 1) {
    limit = 10;
  }

  req.paginationQueryParams = {
    page,
    limit
  };
  next();
};

export default paginationParamsValidations;
