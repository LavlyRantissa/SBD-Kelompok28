const { createAdoption } = require('../models/AdoptionModel');

const handleAdoption = async (req, res) => {
    const { adoptDate, name, email, phoneNumber, pickupOrDelivery, deliveryAddress } = req.body;
    const { identifier, catId } = req.params;
    try {
        const adoption = await createAdoption(identifier, catId, adoptDate, name, email, phoneNumber, pickupOrDelivery, deliveryAddress);
        if (adoption.length !==0 ){
        res.status(201).json({ message: 'Adoption successful', data: adoption });
        }
    } catch (error) {
        res.status(500).json({ message: 'Adoption failed', error: error.message });
    }
};

module.exports = { handleAdoption };