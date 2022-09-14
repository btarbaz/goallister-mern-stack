const express = require('express');
const router = express.Router();
const {
  getGoals,
  updateGoal,
  setGoal,
  deleteGoal,
} = require('../controllers/goals-controller');

router.route('/').get(getGoals).post(setGoal);

router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
