const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/feedbackController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', ctrl.submitFeedback);
router.get('/', authenticate, ctrl.getFeedbacks);

module.exports = router;