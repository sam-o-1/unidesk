const prisma = require('../utils/prismaClient');

async function getAuditLogs(req, res, next) {
  try {
    const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
    res.json(logs);
  } catch (err) { next(err); }
}

module.exports = { getAuditLogs };