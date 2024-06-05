const express = require('express');
const router = express.Router();
const { handleCreateAdoption, handleGetAdoption, handleUpdateAdoption } = require('../controllers/AdoptionController');

router.post('/adoptcat', handleCreateAdoption);
router.get('/adoptinfo', handleGetAdoption);
router.put('/updateadopt/:adoptionId', handleUpdateAdoption);

module.exports = router;
