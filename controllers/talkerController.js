const fs = require('fs/promises');

// Requisito 1
exports.getAllTalkers = (req, res) => {
  const path = './talker.json';
  fs.readFile(path)
    .then((data) => JSON.parse(data))
    .then((data) =>
      (!data.length ? res.status(200).json([]) : res.status(200).json(data)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

// Requisito 2
exports.getTalkerById = (req, res) => {
  const path = './talker.json';
  const { id } = req.params;
  const message = 'Pessoa palestrante não encontrada';
  fs.readFile(path)
    .then((data) => JSON.parse(data))
    .then((data) => data.find((talker) => talker.id === parseInt(id, 10)))
    .then((data) =>
      (!data ? res.status(404).json({ message }) : res.status(200).json(data)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
