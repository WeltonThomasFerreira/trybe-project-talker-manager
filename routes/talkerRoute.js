const express = require('express');

const router = express.Router();
const {
  getAllTalkers,
  getTalkerById,
} = require('../controllers/talkerController');

router
    .get('/', getAllTalkers)
    .get('/:id', getTalkerById);

module.exports = router;
