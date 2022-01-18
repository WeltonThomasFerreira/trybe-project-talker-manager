const fs = require('fs/promises');

// Requisito 1
exports.getAllTalkers = (req, res) => {
  const path = './talker.json';
  fs.readFile(path)
    .then((data) => {
      const talkers = JSON.parse(data);
      return !talkers.length
        ? res.status(200).json([])
        : res.status(200).json(talkers);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

// Requisito 2
exports.getTalkerById = (req, res) => {
  const path = './talker.json';
  const { id } = req.params;
  fs.readFile(path)
    .then((data) => {
      const talkers = JSON.parse(data);
      const response = talkers.find((talker) => talker.id === parseInt(id, 10));
      return !response
        ? res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
          })
        : res.status(200).json(response);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
