const { pool } = require('../config/db-config.js');

const createDonation = async (catId, balance, donateMessage) => {
    try {
        const result = await pool.query(
            'INSERT INTO donation (cat_id, balance, donate_message) VALUES ($1, $2, $3) RETURNING *',
            [catId, balance, donateMessage]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating donation:', error);
        throw error;
    }
};

const getDonationsByCatId = async (catId) => {
    try {
        const result = await pool.query('SELECT * FROM donation WHERE cat_id = $1', [catId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching donations:', error);
        throw error;
    }
};

module.exports = { createDonation, getDonationsByCatId };
