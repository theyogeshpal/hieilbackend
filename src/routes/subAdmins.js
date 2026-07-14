const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find({ role: 'subadmin' }).select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed, role: 'subadmin', permissions });
    res.status(201).json({ ...admin.toObject(), password: undefined });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.password) update.password = await bcrypt.hash(update.password, 10);
    const doc = await Admin.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Admin.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
