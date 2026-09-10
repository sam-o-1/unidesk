const prisma = require('../utils/prismaClient');

async function createCustomer(req, res, next) {
  try {
    const { name, phone, email } = req.body;
    const customer = await prisma.customer.create({ data: { name, phone, email } });
    res.status(201).json(customer);
  } catch (err) { next(err); }
}

async function getCustomers(req, res, next) {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (err) { next(err); }
}

async function getCustomerById(req, res, next) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.params.id },
      include: { jobs: true, feedbacks: true },
    });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) { next(err); }
}

async function updateCustomer(req, res, next) {
  try {
    const customer = await prisma.customer.update({ where: { id: req.params.id }, data: req.body });
    res.json(customer);
  } catch (err) { next(err); }
}

module.exports = { createCustomer, getCustomers, getCustomerById, updateCustomer };