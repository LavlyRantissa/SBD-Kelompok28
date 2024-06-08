const { pool } = require('../config/db-config.js');

const addDonation = async (amount, donateMessage) => {
    try {
        const result = await pool.query(
            'INSERT INTO donation (balance, donate_message) VALUES ($1, $2) RETURNING *',
            [amount, donateMessage]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating donation:', error);
        throw error;
    }
};

module.exports = { addDonation };