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

router.get('/:id', getTalkerById);

module.exports = router;
