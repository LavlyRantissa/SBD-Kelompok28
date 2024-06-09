const { createCat, getCat } = require('../models/CatModel');

const handleCreateCat = async (req, res) => {
    const { catName, catPicture, birthDate, race, gender, description } = req.body;
    try {
        const cat = await createCat(catName, catPicture, birthDate, race, gender, description);
        res.status(201).json({ message: 'Success add cat', data: cat });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add cat', error: error.message });
    }
};

const handleGetCats = async (req, res) => {
    try {
        const cats = await getCat();
        res.status(200).json({ message: 'Cats retrieval successful', data: cats });
    } catch (error) {
        res.status(500).json({ message: 'Cats retrieval failed', error: error.message });
    }
};

module.exports = { handleCreateCat, handleGetCats };