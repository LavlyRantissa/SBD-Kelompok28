const { pool } = require('../config/db-config.js');

pool.connect().then(() => {
	console.log("Connected to PSQL Database");
})

const signIn = async (identifier, password) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users_table WHERE (email = $1 OR username = $1) AND password = $2',
            [identifier, password]
        );
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

const signUp = async (username, email, password) => {
    try {
        const result = await pool.query(
            'INSERT INTO users_table (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

const getUser = async () => {
    try {
        const result = await pool.query('SELECT * FROM users_table ');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUserByIdentifier = async (identifier) => {
    try {
        const result = await pool.query('SELECT * FROM users_table WHERE username = $1 or email = $1', [identifier]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by identifier:', error);
        throw error;
    }
};

const topupUser = async (identifier, balance) => {
    try {
        const result = await pool.query(
            'UPDATE users_table SET balance = balance + $1 WHERE username = $2 or email = $2 RETURNING *',
            [balance, identifier]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error topping up user:', error);
        throw error;
    }
};

const addressUser = async (identifier, address) => {
  try {
      const result = await pool.query(
          'UPDATE users_table SET address =  $1 WHERE username = $2 or email = $2 RETURNING *',
          [address, identifier]
      );
      return result.rows[0];
  } catch (error) {
      console.error('Error topping up user:', error);
      throw error;
  }
};

const phoneNumberUser = async (identifier, phoneNumber) => {
  try {
      const result = await pool.query(
          'UPDATE users_table SET phone_number = $1 WHERE username = $2 or email = $2 RETURNING *',
          [phoneNumber, identifier]
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
            'UPDATE users_table SET username = $1, email = $2, phone_number = $3, password = $4 WHERE user_id = $5 RETURNING *',
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
        await pool.query('DELETE FROM users_table WHERE user_id = $1', [id]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};


const checkEmail = async(email) => {
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE email = '${email}'`
      );

      return result.rows[0];

    } catch (error) {
      console.error('Error checking email:', error);
        throw error;
    }
  }

  const checkUsername = async(username) => {
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE username = '${username}'`
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error checking username:', error);
        throw error;
    }
  }


const forgotPassword = async (identifier, newPassword) => {
    try {
      const result = await pool.query(
        `UPDATE users_table SET password = $1 WHERE username = $2 OR email = $2 RETURNING *`,
        [newPassword, identifier]
      );
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error change password:', error);
      throw error;
    }
  };

  const accountExist = async (identifier) => {
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE username = '${identifier}' OR email = '${identifier}'`
      );
      if (result.rows.length === 0) {
        throw new Error('Account not exist');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error check account :', error);
      throw error;
    }
  };
  
  const insertPicture = async (identifier, linkPicture) => {
    try {
      const result = await pool.query(
        `UPDATE users_table SET profile_picture = '${linkPicture}' WHERE username = '${identifier}' or email = '${identifier}' RETURNING *`
      );
      if (result.rows.length === 0) {
        throw new Error('Update picture failed');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error check account :', error);
      throw error;
    }
  };

  

module.exports = { signIn, signUp, getUser, topupUser, getUserByIdentifier, updateUser, deleteUser, checkEmail, checkUsername, forgotPassword, accountExist, insertPicture, addressUser, phoneNumberUser};