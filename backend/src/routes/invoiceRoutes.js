const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/invoiceController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.post('/', ctrl.createInvoice);
router.get('/job/:jobId', ctrl.getInvoiceByJob);

module.exports = router;