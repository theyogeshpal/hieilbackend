const express = require('express');
const router = express.Router();
const crudRouter = require('./crudRouter');
const DomesticLogistics = require('../models/DomesticLogistics');

// Use the standard CRUD operations
module.exports = crudRouter(DomesticLogistics);
