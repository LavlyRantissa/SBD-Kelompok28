const { pool } = require('../config/db-config.js');

const adoption = async (userId, catId, adoptDate, name, email, phoneNumber, pickupOrDelivery, deliveryAddress, catName, catBreed, catGender) => {
    try {
        const result = await pool.query(
            `INSERT INTO adoption (user_id, cat_id, adopt_date, name, email, phone_number, pickup_or_delivery, delivery_address, cat_name, cat_breed, cat_gender) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [userId, catId, adoptDate, name, email, phoneNumber, pickupOrDelivery, deliveryAddress, catName, catBreed, catGender]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating adoption:', error);
        throw error;
    }
};

module.exports = { adoption };