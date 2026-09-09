const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/partController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/', ctrl.getParts);
router.post('/', ctrl.createPart);
router.patch('/:id/quantity', ctrl.updatePartQuantity);
router.post('/use', ctrl.usePartOnJob);

module.exports = router;