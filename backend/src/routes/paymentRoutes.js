const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/', ctrl.getPayments);
router.post('/', ctrl.createPayment);

module.exports = router;