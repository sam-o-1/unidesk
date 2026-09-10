const prisma = require('../utils/prismaClient');

async function createEmployee(req, res, next) {
  try {
    const { name, role, branchId } = req.body;
    const employee = await prisma.employee.create({ data: { name, role, branchId } });
    res.status(201).json(employee);
  } catch (err) { next(err); }
}

async function getEmployees(req, res, next) {
  try {
    const where = req.query.branchId ? { branchId: req.query.branchId } : {};
    const employees = await prisma.employee.findMany({ where, include: { branch: true } });
    res.json(employees);
  } catch (err) { next(err); }
}

async function getEmployeeById(req, res, next) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: req.params.id },
      include: { jobs: true, branch: true },
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) { next(err); }
}

async function updateEmployee(req, res, next) {
  try {
    const employee = await prisma.employee.update({ where: { id: req.params.id }, data: req.body });
    res.json(employee);
  } catch (err) { next(err); }
}

async function deleteEmployee(req, res, next) {
  try {
    await prisma.employee.delete({ where: { id: req.params.id } });
    res.json({ message: 'Employee deleted' });
  } catch (err) { next(err); }
}

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };