const { createAdoption, getAdoptionsByUserId, getAdoptionsByCatId, updateAdoption } = require('../models/AdoptionModel');

const handleCreateAdoption = async (req, res) => {
    const { userId, catId, adoptDate } = req.body;
    try {
        const adoption = await createAdoption(userId, catId, adoptDate);
        res.status(201).json(adoption);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetAdoptionsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const adoptions = await getAdoptionsByUserId(userId);
        res.status(200).json(adoptions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetAdoptionsByCatId = async (req, res) => {
    const { catId } = req.params;
    try {
        const adoptions = await getAdoptionsByCatId(catId);
        res.status(200).json(adoptions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleUpdateAdoption = async (req, res) => {
    const { adoptionId } = req.params;
    const { adoptDate } = req.body;
    try {
        const adoption = await updateAdoption(adoptionId, adoptDate);
        res.status(200).json(adoption);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleCreateAdoption, handleGetAdoptionsByUserId, handleGetAdoptionsByCatId, handleUpdateAdoption };
