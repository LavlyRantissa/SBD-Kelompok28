const { pool } = require('../config/db-config.js');

const createCat = async (catName, catPicture, birthDate, race, gender, description) => {
    try {
        const result = await pool.query(
            'INSERT INTO cats (cat_name, cat_picture, birthDate, race, gender, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [catName, catPicture, birthDate, race, gender, description]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating cat:', error);
        throw error;
    }
};

const getCat = async () => {
    try {
        const result = await pool.query('SELECT * FROM cats');
        return result.rows;
    } catch (error) {
        console.error('Error fetching cats:', error);
        throw error;
    }
};

module.exports = { createCat, getCat };