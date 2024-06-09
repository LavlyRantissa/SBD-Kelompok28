const express = require('express');
const router = express.Router();
const { handleAdoption } = require('../controllers/AdoptionController');

router.post('/adoptcat/:identifier/:catId', handleAdoption);

module.exports = router;
