const prisma = require('../utils/prismaClient');
const logAction = require('../utils/auditLog');

async function createJob(req, res, next) {
  try {
    const { branchId, customerId, employeeId, device, issue } = req.body;
    const job = await prisma.job.create({
      data: { branchId, customerId, employeeId: employeeId || null, device, issue },
    });
    await logAction('JOB_CREATED', req.user.id, { jobId: job.id });
    res.status(201).json(job);
  } catch (err) { next(err); }
}

async function getJobs(req, res, next) {
  try {
    const where = {};
    if (req.query.branchId) where.branchId = req.query.branchId;
    if (req.query.status) where.status = req.query.status;

    const jobs = await prisma.job.findMany({
      where,
      include: { customer: true, employee: true, branch: true, payment: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (err) { next(err); }
}

async function getJobById(req, res, next) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        customer: true, employee: true, branch: true,
        payment: true, invoice: true, feedback: true,
        partsUsed: { include: { part: true } },
      },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) { next(err); }
}

async function updateJobStatus(req, res, next) {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const job = await prisma.job.update({ where: { id: req.params.id }, data: { status } });
    await logAction('JOB_STATUS_UPDATED', req.user.id, { jobId: job.id, status });
    res.json(job);
  } catch (err) { next(err); }
}

async function assignEmployee(req, res, next) {
  try {
    const { employeeId } = req.body;
    const job = await prisma.job.update({ where: { id: req.params.id }, data: { employeeId } });
    res.json(job);
  } catch (err) { next(err); }
}

module.exports = { createJob, getJobs, getJobById, updateJobStatus, assignEmployee };