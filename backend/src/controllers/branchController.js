const prisma = require('../utils/prismaClient');
const logAction = require('../utils/auditLog');

async function createBranch(req, res, next) {
  try {
    const { name, address } = req.body;
    const branch = await prisma.branch.create({ data: { name, address } });
    await logAction('BRANCH_CREATED', req.user.id, { branchId: branch.id });
    res.status(201).json(branch);
  } catch (err) { next(err); }
}

async function getBranches(req, res, next) {
  try {
    const branches = await prisma.branch.findMany({ include: { employees: true } });
    res.json(branches);
  } catch (err) { next(err); }
}

async function getBranchById(req, res, next) {
  try {
    const branch = await prisma.branch.findUnique({
      where: { id: req.params.id },
      include: { employees: true, jobs: true, parts: true },
    });
    if (!branch) return res.status(404).json({ error: 'Branch not found' });
    res.json(branch);
  } catch (err) { next(err); }
}

async function updateBranch(req, res, next) {
  try {
    const branch = await prisma.branch.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(branch);
  } catch (err) { next(err); }
}

async function deleteBranch(req, res, next) {
  try {
    await prisma.branch.delete({ where: { id: req.params.id } });
    res.json({ message: 'Branch deleted' });
  } catch (err) { next(err); }
}

module.exports = { createBranch, getBranches, getBranchById, updateBranch, deleteBranch };