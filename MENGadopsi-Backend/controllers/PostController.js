const { createPost, getPosts, deletePost } = require('../models/PostModel');

const handleCreatePost = async (req, res) => {
    const { catId, userId, message } = req.body;
    try {
        const post = await createPost(catId, userId, message);
        res.status(201).json({ message: 'Post creation successful', data: post });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};

const handleGetPosts = async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(200).json({ message: 'Posts retrieval successful', data: posts });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve posts', error: error.message });
    }
};

const handleDeletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePost(id);
        res.status(204).json({ message: 'Post deletion successful' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
};

module.exports = { handleCreatePost, handleGetPosts, handleDeletePost };