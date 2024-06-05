const express = require('express');
const router = express.Router();
const { handleCreateDonation, handleGetDonationsByCatId, handleUpdateDonation } = require('../controllers/DonationController');

router.post('/', handleCreateDonation);
router.get('/:catId', handleGetDonationsByCatId);
router.put('/:donationId', handleUpdateDonation);

module.exports = router;