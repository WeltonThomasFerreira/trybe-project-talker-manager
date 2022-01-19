const express = require('express');

const router = express.Router();
const {
  getAllTalkers,
  getTalkerById,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
  createTalker,
  editTalker,
} = require('../controllers/talkerController');

router
  .route('/')
  .get(getAllTalkers)
  .post(
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateTalkWatchedAt,
    validateTalkRate,
    createTalker,
  );

router
  .route('/:id')
  .get(getTalkerById)
  .put(
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateTalkWatchedAt,
    validateTalkRate,
    editTalker,
  );

module.exports = router;
