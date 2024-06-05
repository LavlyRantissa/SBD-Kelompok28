const express = require('express');
const router = express.Router();
const { handleCreateCat, handleGetCats } = require('../controllers/CatController');

router.post('/', handleCreateCat);
router.get('/', handleGetCats);

module.exports = router;
