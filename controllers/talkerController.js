// Referência: Condicional da função validateTalk, PR do Rafael Veiga
// src: https://github.com/tryber/sd-014-b-project-talker-manager/blob/9407144110b990e57cb0ba16d6db5f5a3cd16a69/Middlewares/Validations/talkValidator.js

const fs = require('fs/promises');
const moment = require('moment');

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

// Requisito 4
exports.validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenIsRequired = 'Token não encontrado';
  const invalidToken = 'Token inválido';
  if (!authorization) return res.status(401).json({ message: tokenIsRequired });
  if (authorization.length !== 16) {
    return res.status(401).json({ message: invalidToken });
  }
  next();
};

exports.validateName = (req, res, next) => {
  const { name } = req.body;
  const nameIsRequired = 'O campo "name" é obrigatório';
  const invalidName = 'O "name" deve ter pelo menos 3 caracteres';
  if (!name) return res.status(400).json({ message: nameIsRequired });
  if (name.length < 3) return res.status(400).json({ message: invalidName });
  next();
};

exports.validateAge = (req, res, next) => {
  const { age } = req.body;
  const ageIsRequired = 'O campo "age" é obrigatório';
  const invalidAge = 'O campo "age" deve ser do número inteiro';
  const underage = 'A pessoa palestrante deve ser maior de idade';
  if (!age) return res.status(400).json({ message: ageIsRequired });
  if (!Number.isInteger(age)) {
    return res.status(400).json({ message: invalidAge });
  }
  if (age < 18) return res.status(400).json({ message: underage });
  next();
};

exports.validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const emptyKeys = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({ message: emptyKeys });
  }
  next();
};

exports.validateTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const invalidDate = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  if (!moment(talk.watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(400).json({ message: invalidDate });
  }
  next();
};

exports.validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';
  if (!(talk.rate >= 1 && talk.rate <= 5)) {
    return res.status(400).json({ message: invalidRate });
  }
  next();
};

exports.createTalker = (req, res) => {
  const path = './talker.json';
  const { body } = req;
  fs.readFile(path)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const newTalker = { id: data.length + 1, ...body };
      fs.writeFile(path, JSON.stringify([...data, newTalker]));
      return newTalker;
    })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

// Requisito 5
exports.editTalker = (req, res) => {
  const path = './talker.json';
  const { id } = req.params;
  const { body } = req;
  fs.readFile(path)
    .then((data) => JSON.parse(data))
    .then((data) => data.filter((talker) => talker.id !== parseInt(id, 10)))
    .then((data) => {
      const newTalker = { id: parseInt(id, 10), ...body };
      fs.writeFile(
        path,
        JSON.stringify([...data, newTalker]),
      );
      return newTalker;
    })
    .then((data) => res.status(200).json(data));
};
