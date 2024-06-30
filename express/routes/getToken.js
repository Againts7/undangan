const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();

const getToken = (req, res) => {
  const { key } = req.query;
  if (key === process.env.SECRET_KEY) {
    const token = jwt.sign({ userId: key }, process.env.SECRET_KEY, {
      expiresIn: '1s',
    });
    return res.json({ token });
  }
  console.log(path.join(__dirname, '../../index.html'));
};

router.get('/', getToken);

module.exports = router;
