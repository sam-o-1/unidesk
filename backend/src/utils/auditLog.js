const prisma = require('./prismaClient');

async function logAction(action, performedBy, details = {}) {
  try {
    await prisma.auditLog.create({
      data: { action, performedBy, details },
    });
  } catch (err) {
    console.error('Failed to write audit log:', err.message);
  }
}

module.exports = logAction;