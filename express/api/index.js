const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
console.log(path.join(__dirname, '../public'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// const authRoutes = require('./routes/auth');
// const getCommentRoutes = require('./routes/getComment');
// const getToken = require('./routes/getToken');
const router = require('../router');

// app.use('/auth', authRoutes);
// app.use('/getComment', getCommentRoutes);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
