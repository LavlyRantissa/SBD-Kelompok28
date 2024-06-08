const express = require('express');
const router = express.Router();
const { handleAdoption } = require('../controllers/AdoptionController');

router.post('/adoptcat', handleAdoption);

module.exports = router;
