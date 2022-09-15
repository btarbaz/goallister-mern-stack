const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/users-controller');
const { protect } = require('../middlewares/auth-middleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
