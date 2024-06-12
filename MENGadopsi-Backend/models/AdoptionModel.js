const { pool } = require('../config/db-config.js');

const createAdoption = async (identifier, catId, adoptDate, name, email, phoneNumber, pickUpOrDelivery, deliveryAddress) => {
    try {
        const result = await pool.query(
            `INSERT INTO adoptions (user_id, cat_id, adopt_date, name, email, phone_number, pickup_or_delivery, delivery_address, cat_name, cat_breed, cat_gender) select u.user_id, c.cat_id, '${adoptDate}', '${name}', '${email}', '${phoneNumber}', '${pickUpOrDelivery}', '${deliveryAddress}', c.cat_name, c.race, c.gender FROM users_table u, cats c WHERE( u.username = '${identifier}' OR u.email = '${identifier}') AND c.cat_id = '${catId}' AND c.status = 'AVAILABLE' RETURNING *`
        );

        const remove = await pool.query(
            `UPDATE cats SET status = 'ADOPTED' WHERE cat_id = '${catId}'`
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating adoption:', error);
        throw error;
    }
};

module.exports = { createAdoption };