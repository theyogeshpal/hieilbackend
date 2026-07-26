const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');

// Get all settings or a specific setting
router.get('/', async (req, res) => {
  try {
    const { key } = req.query;
    if (key) {
      const setting = await SiteSettings.findOne({ key });
      return res.json({ [key]: setting ? setting.value : null });
    }
    const settings = await SiteSettings.find({});
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update or create a setting
router.post('/', async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'Key is required' });
    }
    
    const setting = await SiteSettings.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
