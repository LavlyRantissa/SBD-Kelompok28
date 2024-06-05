const express = require('express');
const router = express.Router();
const { handleCreatePost, handleGetPosts, handleDeletePost } = require('../controllers/PostController');

router.post('/', handleCreatePost);
router.get('/', handleGetPosts);
router.delete('/:id', handleDeletePost);

module.exports = router;