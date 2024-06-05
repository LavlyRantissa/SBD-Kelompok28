const { pool } = require('../config/db-config.js');

const createAdoption = async (userId, catId, adoptDate) => {
    try {
        const result = await pool.query(
            'INSERT INTO adoption (user_id, cat_id, adopt_date) VALUES ($1, $2, $3) RETURNING *',
            [userId, catId, adoptDate]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating adoption:', error);
        throw error;
    }
};

const getAdoptionsByUserId = async (userId) => {
    try {
        const result = await pool.query('SELECT * FROM adoption WHERE user_id = $1', [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching adoptions by user:', error);
        throw error;
    }
};

const getAdoptionsByCatId = async (catId) => {
    try {
        const result = await pool.query('SELECT * FROM adoption WHERE cat_id = $1', [catId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching adoptions by cat:', error);
        throw error;
    }
};

const updateAdoption = async (adoptionId, adoptDate) => {
    try {
        const result = await pool.query(
            'UPDATE adoption SET adopt_date = $1 WHERE adopt_id = $2 RETURNING *',
            [adoptDate, adoptionId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating adoption:', error);
        throw error;
    }
};

module.exports = { createAdoption, getAdoptionsByUserId, getAdoptionsByCatId, updateAdoption };
