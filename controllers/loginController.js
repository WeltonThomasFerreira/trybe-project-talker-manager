const randtoken = require('rand-token');
const validator = require('email-validator');
const PasswordValidator = require('password-validator');

exports.validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailIsRequired = 'O campo "email" é obrigatório';
  const invalidEmail = 'O "email" deve ter o formato "email@email.com"';
  if (!email) return res.status(400).json({ message: emailIsRequired });
  if (!validator.validate(email)) return res.status(400).json({ message: invalidEmail });
  next();
};

exports.validatePassword = (req, res, next) => {
  const { password } = req.body;
  const schema = new PasswordValidator();
  schema.is().min(6);
  const passwordIsRequired = 'O campo "password" é obrigatório';
  const invalidPassword = 'O "password" deve ter pelo menos 6 caracteres';
  if (!password) return res.status(400).json({ message: passwordIsRequired });
  if (!schema.validate(password)) { return res.status(400).json({ message: invalidPassword }); }
  next();
};

exports.generateToken = (req, res) => {
  const token = randtoken.generate(16);
  res.status(200).json({ token });
};
