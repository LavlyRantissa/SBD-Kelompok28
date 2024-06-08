const { createAdoption } = require('../models/AdoptionModel');

const handleAdoption = async (req, res) => {
    const { userId, catId, adoptDate, name, email, phoneNumber, pickupOrDelivery, deliveryAddress, catName, catBreed, catGender } = req.body;
    try {
        const adoption = await createAdoption(userId, catId, adoptDate, name, email, phoneNumber, pickupOrDelivery, deliveryAddress, catName, catBreed, catGender);
        res.status(201).json({ message: 'Adoption successful', data: adoption });
    } catch (error) {
        res.status(500).json({ message: 'Adoption failed', error: error.message });
    }
};

module.exports = { handleAdoption };