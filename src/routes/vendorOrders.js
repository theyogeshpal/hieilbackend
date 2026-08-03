const express = require('express');
const router = express.Router();
const crudRouter = require('./crudRouter');
const VendorOrder = require('../models/VendorOrder');

// Use the standard CRUD operations
module.exports = crudRouter(VendorOrder);
