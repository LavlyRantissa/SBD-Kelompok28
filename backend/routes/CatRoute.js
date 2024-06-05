const express = require('express');
const router = express.Router();
const { handleCreateCat, handleGetCats } = require('../controllers/CatController');

router.post('/addcat', handleCreateCat);
router.get('/seecat', handleGetCats);

module.exports = router;
