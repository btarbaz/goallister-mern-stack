const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/error-middleware');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Goals Routes
app.use('/api/goals', require('./routes/goals-route'));
// Users Routes
app.use('/api/users', require('./routes/users-route'));

// custom middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started running on ${port}`.cyan.underline);
});
