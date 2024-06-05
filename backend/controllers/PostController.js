const { createPost, getPosts, deletePost } = require('../models/PostModel');

const handleCreatePost = async (req, res) => {
    const { catId, userId, message } = req.body;
    try {
        const post = await createPost(catId, userId, message);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetPosts = async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleDeletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePost(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleCreatePost, handleGetPosts, handleDeletePost };