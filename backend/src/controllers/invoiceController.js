const prisma = require('../utils/prismaClient');

async function createInvoice(req, res, next) {
  try {
    const { jobId, invoiceNumber, fileUrl, extractedData } = req.body;
    const invoice = await prisma.invoice.create({
      data: { jobId, invoiceNumber, fileUrl: fileUrl || null, extractedData: extractedData || null },
    });
    res.status(201).json(invoice);
  } catch (err) { next(err); }
}

async function getInvoiceByJob(req, res, next) {
  try {
    const invoice = await prisma.invoice.findUnique({ where: { jobId: req.params.jobId } });
    if (!invoice) return res.status(404).json({ error: 'No invoice for this job yet' });
    res.json(invoice);
  } catch (err) { next(err); }
}

module.exports = { createInvoice, getInvoiceByJob };