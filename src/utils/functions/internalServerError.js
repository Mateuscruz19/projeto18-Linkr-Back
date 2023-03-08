const internalServerError = (res, error) => {
  return res.status(500).send(`Houston, we have a problem! ${error}`);
};

export default internalServerError;
