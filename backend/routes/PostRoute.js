const express = require('express');
const router = express.Router();
const { handleCreatePost, handleGetPosts, handleDeletePost } = require('../controllers/PostController');

router.post('/post', handleCreatePost);
router.get('/getpost', handleGetPosts);
router.delete('/deletepost/:id', handleDeletePost);

module.exports = router;