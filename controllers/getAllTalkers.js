const fs = require('fs/promises');

exports.get = (req, res) => {
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
