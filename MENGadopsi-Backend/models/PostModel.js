const { pool } = require('../config/db-config.js');

const createPost = async (catId, userId, message) => {
    try {
        const result = await pool.query(
            'INSERT INTO post (cat_id, user_id, message) VALUES ($1, $2, $3) RETURNING *',
            [catId, userId, message]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

const getPosts = async () => {
    try {
        const result = await pool.query('SELECT * FROM post');
        return result.rows;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

const deletePost = async (id) => {
    try {
        await pool.query('DELETE FROM post WHERE post_id = $1', [id]);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

module.exports = { createPost, getPosts, deletePost };