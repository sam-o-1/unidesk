const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/', ctrl.getJobs);
router.get('/:id', ctrl.getJobById);
router.post('/', ctrl.createJob);
router.patch('/:id/status', ctrl.updateJobStatus);
router.patch('/:id/assign', ctrl.assignEmployee);

module.exports = router;