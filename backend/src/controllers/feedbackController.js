const prisma = require('../utils/prismaClient');

async function submitFeedback(req, res, next) {
  try {
    const { jobId, customerId, rating, comment } = req.body;
    const feedback = await prisma.feedback.create({
      data: { jobId, customerId, rating, comment: comment || null },
    });
    res.status(201).json(feedback);
  } catch (err) { next(err); }
}

async function getFeedbacks(req, res, next) {
  try {
    const feedbacks = await prisma.feedback.findMany({ include: { customer: true, job: true } });
    res.json(feedbacks);
  } catch (err) { next(err); }
}

module.exports = { submitFeedback, getFeedbacks };