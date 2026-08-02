const express = require('express');

// Creates standard GET all, GET one, POST, PUT, DELETE routes for a model
const crudRouter = (Model) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const docs = await Model.find().sort({ createdAt: -1 }).lean();
      res.json(docs);
    } catch (e) { res.status(500).json({ message: e.message }); }
  });

  router.get('/:id', async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id).lean();
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (e) { res.status(500).json({ message: e.message }); }
  });

  router.post('/', async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      
      // Create notification for enquiry models
      const enquiryModels = ['Inquiry', 'Contact', 'ServiceInquiry', 'ProductCQ', 'BulkFmoq', 'Feedback', 'DownloadLead'];
      if (enquiryModels.includes(Model.modelName)) {
        try {
          const Notification = require('../models/Notification');
          let name = req.body.name || req.body.firstName || req.body.fullName || 'Someone';
          let title = `New ${Model.modelName}`;
          let message = `${name} submitted a new ${Model.modelName.toLowerCase()}.`;
          
          let link = '/admin/dashboard';
          if (Model.modelName === 'Inquiry') link = '/admin/inquiries';
          if (Model.modelName === 'Contact') link = '/admin/contact';
          if (Model.modelName === 'ServiceInquiry') link = '/admin/service-inquiries';
          if (Model.modelName === 'ProductCQ') link = '/admin/product-cq';
          if (Model.modelName === 'BulkFmoq') link = '/admin/bulk-fmoq';
          if (Model.modelName === 'Feedback') link = '/admin/feedback';
          if (Model.modelName === 'DownloadLead') link = '/admin/download-leads';
          
          await Notification.create({
            modelName: Model.modelName,
            title,
            message,
            link
          });
        } catch (notifErr) {
          console.error('Failed to create notification:', notifErr);
        }
      }

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

  router.post('/bulk-delete', async (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({message: 'No IDs provided'});
      await Model.deleteMany({ _id: { $in: ids } });
      res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
  });

  return router;
};

module.exports = crudRouter;
