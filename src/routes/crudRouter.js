const express = require('express');

// Creates standard GET all, GET one, POST, PUT, DELETE routes for a model
const crudRouter = (Model) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const docs = await Model.find().sort({ createdAt: -1 });
      res.json(docs);
    } catch (e) { res.status(500).json({ message: e.message }); }
  });

  router.get('/:id', async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (e) { res.status(500).json({ message: e.message }); }
  });

  router.post('/', async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (e) { res.status(400).json({ message: e.message }); }
  });

  router.put('/:id', async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (e) { res.status(400).json({ message: e.message }); }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
  });

  return router;
};

module.exports = crudRouter;
