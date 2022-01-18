const fs = require('fs/promises');

// Requisito 1
exports.getAllTalkers = (req, res) => {
  const talker = './talker.json';
  fs.readFile(talker)
    .then((data) => {
      const response = JSON.parse(data);
      return !response.length
        ? res.status(200).json([])
        : res.status(200).json(response);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

// Requisito 2
exports.getTalkerById = (req, res) => {
  res.status(200).json([{ id: req.params.id }]);
};
