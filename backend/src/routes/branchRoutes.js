const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/branchController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/', ctrl.getBranches);
router.get('/:id', ctrl.getBranchById);
router.post('/', authorize('OWNER'), ctrl.createBranch);
router.put('/:id', authorize('OWNER'), ctrl.updateBranch);
router.delete('/:id', authorize('OWNER'), ctrl.deleteBranch);

module.exports = router;