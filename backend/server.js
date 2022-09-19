const express = require('express');
const path = require('path');
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

// serve frontend
if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// custom middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started running on ${port}`.cyan.underline);
});
