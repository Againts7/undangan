const express = require('express');
// const jwt = require('jsonwebtoken');
const path = require('path');
const { getComment, postComment, deleteComment } = require('./handler');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

router.get('/komen', getComment);
router.post('/komen', postComment);
router.delete('/komen', deleteComment);

module.exports = router;
