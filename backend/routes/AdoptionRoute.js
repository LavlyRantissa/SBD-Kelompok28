const express = require('express');
const router = express.Router();
const { handleCreateAdoption, handleGetAdoptionsByUserId, handleGetAdoptionsByCatId, handleUpdateAdoption } = require('../controllers/AdoptionController');

router.post('/', handleCreateAdoption);
router.get('/user/:userId', handleGetAdoptionsByUserId);
router.get('/cat/:catId', handleGetAdoptionsByCatId);
router.put('/:adoptionId', handleUpdateAdoption);

module.exports = router;
