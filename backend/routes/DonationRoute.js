const express = require('express');
const router = express.Router();
const { handleAddDonation } = require('../controllers/DonationController');

router.post('/donate', handleAddDonation);

module.exports = router;