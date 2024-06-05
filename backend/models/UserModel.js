const { pool } = require('../config/db-config.js');

pool.connect().then(() => {
	console.log("Connected to PSQL Database");
})

const createUser = async (username, email, phoneNumber, password) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, email, phone_number, balance, profile_picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, password, email, phoneNumber, 0.00, null]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const getUser = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
};

const updateUser = async (id, username, email, phoneNumber, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, phone_number = $3, password = $4 WHERE user_id = $5 RETURNING *',
            [username, email, phoneNumber, hashedPassword, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

module.exports = { createUser, getUser, getUserById, updateUser, deleteUser };