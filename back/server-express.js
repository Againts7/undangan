const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const authRoutes = require('./routes/auth');
const getCommentRoutes = require('./routes/getComment');
const getToken = require('./routes/getToken');

app.use('/auth', authRoutes);
app.use('/getComment', getCommentRoutes);
app.use('/', getToken);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
