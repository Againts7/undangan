const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // [1] = token
  console.log(token);

  if (!token) {
    return res.status(403).send('Token diperlukan untuk autentikasi');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).send('Token tidak valid atau telah kedaluarsa');
    }
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, (req, res) => {
  res.send('Ini adalah data yang terlindungi');
});

module.exports = router;
