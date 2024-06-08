const { addDonation } = require('../models/DonationModel');

const handleAddDonation = async (req, res) => {
    const { amount, donateMessage } = req.body;
    try {
        const donation = await addDonation(amount, donateMessage);
        res.status(201).json({ message: 'Donation added successfully', data: donation });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add donation', error: error.message });
    }
};

module.exports = { handleAddDonation };