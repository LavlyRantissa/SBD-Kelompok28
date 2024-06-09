const express = require('express');
const router = express.Router();
const { handleCreateCat, handleGetCats, handleGetCatsById, handleRemoveCat} = require('../controllers/CatController');

router.post('/addcat', handleCreateCat);
router.get('/seecat', handleGetCats);
router.get('/:catId', handleGetCatsById);
router.delete('/:catId', handleRemoveCat);

module.exports = router;
