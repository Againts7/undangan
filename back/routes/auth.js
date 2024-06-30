const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
// curl -X GET http://localhost:5000/getComment -H "Authorization: Bearer aiu" -i

const users = [{ id: 1, username: 'user1' }];

router.post('/login', (req, res) => {
  const { username } = req.body;
  console.log(req.body);

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send('username salah atau tidak ditemukan');
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: '1s' },
  );

  return res.json({ token });
});

module.exports = router;
