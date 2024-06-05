const express = require('express');
const router = express.Router();
const { handleCreateDonation, handleGetDonationsByCatId } = require('../controllers/DonationController');

router.post('/donate', handleCreateDonation);
router.get('/donate/:catId', handleGetDonationsByCatId);

module.exports = router;