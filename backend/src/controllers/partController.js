const prisma = require('../utils/prismaClient');

async function createPart(req, res, next) {
  try {
    const { name, quantity, branchId } = req.body;
    const part = await prisma.part.create({ data: { name, quantity, branchId } });
    res.status(201).json(part);
  } catch (err) { next(err); }
}

async function getParts(req, res, next) {
  try {
    const where = req.query.branchId ? { branchId: req.query.branchId } : {};
    const parts = await prisma.part.findMany({ where });
    res.json(parts);
  } catch (err) { next(err); }
}

async function updatePartQuantity(req, res, next) {
  try {
    const { quantity } = req.body;
    const part = await prisma.part.update({ where: { id: req.params.id }, data: { quantity } });
    res.json(part);
  } catch (err) { next(err); }
}

async function usePartOnJob(req, res, next) {
  try {
    const { jobId, partId, quantity } = req.body;

    const part = await prisma.part.findUnique({ where: { id: partId } });
    if (!part) return res.status(404).json({ error: 'Part not found' });
    if (part.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock for this part' });
    }

    const [jobPart] = await prisma.$transaction([
      prisma.jobPart.create({ data: { jobId, partId, quantity } }),
      prisma.part.update({ where: { id: partId }, data: { quantity: part.quantity - quantity } }),
    ]);

    res.status(201).json(jobPart);
  } catch (err) { next(err); }
}

module.exports = { createPart, getParts, updatePartQuantity, usePartOnJob };