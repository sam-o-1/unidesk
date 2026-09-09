const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/customerController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/', ctrl.getCustomers);
router.get('/:id', ctrl.getCustomerById);
router.post('/', ctrl.createCustomer);
router.put('/:id', ctrl.updateCustomer);

module.exports = router;