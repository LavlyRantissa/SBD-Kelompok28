const { createCat, getCat } = require('../models/CatModel');

const handleCreateCat = async (req, res) => {
    const { catName, catPicture, birthDate, race, gender, description } = req.body;
    try {
        const cat = await createCat(catName, catPicture, birthDate, race, gender, description);
        res.status(201).json(cat);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetCats = async (req, res) => {
    try {
        const cats = await getCat();
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleCreateCat, handleGetCats };