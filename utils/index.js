const sendToken = (data, status, res) => {
  return res.status(status).json(data);
};

module.exports = {
  sendToken
};
