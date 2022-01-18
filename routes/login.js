const express = require('express');

const router = express.Router();
const {
  validateEmail,
  validatePassword,
  generateToken,
} = require('../controllers/loginController');

router.post('/', validateEmail, validatePassword, generateToken);

module.exports = router;
