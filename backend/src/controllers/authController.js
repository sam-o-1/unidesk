const prisma = require('../utils/prismaClient');
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');
const logAction = require('../utils/auditLog');

async function signup(req, res, next) {
  try {
    const { name, email, password, role, branchId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: role || 'STAFF', branchId: branchId || null },
    });

    await logAction('USER_SIGNUP', user.id, { email });

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    await logAction('USER_LOGIN', user.id, {});

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, branchId: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login, me };