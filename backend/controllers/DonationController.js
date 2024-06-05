const { createDonation, getDonationsByCatId, updateDonation } = require('../models/DonationModel');

const handleCreateDonation = async (req, res) => {
    const { catId, balance, donateMessage } = req.body;
    try {
        const donation = await createDonation(catId, balance, donateMessage);
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetDonationsByCatId = async (req, res) => {
    const { catId } = req.params;
    try {
        const donations = await getDonationsByCatId(catId);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleUpdateDonation = async (req, res) => {
    const { donationId } = req.params;
    const { balance, donateMessage } = req.body;
    try {
        const updatedDonation = await updateDonation(donationId, balance, donateMessage);
        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleCreateDonation, handleGetDonationsByCatId, handleUpdateDonation };