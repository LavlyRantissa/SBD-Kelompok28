const { pool } = require('../config/db-config.js');

pool.connect().then(() => {
	console.log("Connected to PSQL Database");
})

const signIn = async (email, password) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('User not found or invalid password');
        }
        return user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

const signUp = async (username, email, password, phone_number) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING username, email, password, phone_number',
            [username, email, password, phone_number]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error signing up:', error);
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

const topupUser = async (id, amount) => {
    try {
        const result = await pool.query(
            'UPDATE users SET balance = balance + $1 WHERE user_id = $2 RETURNING *',
            [amount, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error topping up user:', error);
        throw error;
    }
};

const updateUser = async (id, username, email, phoneNumber, password) => {
    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, phone_number = $3, password = $4 WHERE user_id = $5 RETURNING *',
            [username, email, phoneNumber, password, id]
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

module.exports = { signIn, signUp, getUser, topupUser, getUserById, updateUser, deleteUser };