const prisma = require('../utils/prismaClient');
const logAction = require('../utils/auditLog');

async function createPayment(req, res, next) {
  try {
    const { jobId, amount, method } = req.body;
    const payment = await prisma.payment.create({ data: { jobId, amount, method } });
    await logAction('PAYMENT_RECORDED', req.user.id, { jobId, amount });
    res.status(201).json(payment);
  } catch (err) { next(err); }
}

async function getPayments(req, res, next) {
  try {
    const payments = await prisma.payment.findMany({ include: { job: true } });
    res.json(payments);
  } catch (err) { next(err); }
}

module.exports = { createPayment, getPayments };