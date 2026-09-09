const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/', ctrl.getEmployees);
router.get('/:id', ctrl.getEmployeeById);
router.post('/', authorize('OWNER', 'ADMIN'), ctrl.createEmployee);
router.put('/:id', authorize('OWNER', 'ADMIN'), ctrl.updateEmployee);
router.delete('/:id', authorize('OWNER', 'ADMIN'), ctrl.deleteEmployee);

module.exports = router;