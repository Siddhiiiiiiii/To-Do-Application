const { ModelName } = require('../models');

exports.getMethod = async (req, res) => {
  const data = await ModelName.findAll();
  res.json(data);
};

exports.postMethod = async (req, res) => {
  const data = await ModelName.create(req.body);
  res.json(data);
};
