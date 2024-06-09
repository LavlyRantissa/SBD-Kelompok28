const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  pool.connect().then(() => {
    console.log("Connected to the database account");
  });


//For register
async function register(req, res) {
    const { email, username, password } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users_table (email, username, password) VALUES ($1, $2, $3) RETURNING *', 
        [email, username, password]
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To Register Account4!", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }

  //For login
  async function login(req, res) {
    const { emailorname, password } = req.body;
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE (username = '${emailorname}' and  password = '${password}') or (email = '${emailorname}' and password = '${password}')`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To Register Account3!", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }

  //For change password
  async function forgotPassword(req, res) {
    const { emailorname, newPassword } = req.body;
    try {
      const result = await pool.query(
        `UPDATE users_table SET password = '${newPassword}' WHERE username = '${emailorname}' OR email = '${emailorname}' RETURNING *`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To Register Account2!", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }

  //To check if email is exist, it's used for change password
  async function checkEmail(req, res) {
    const {email} = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE email = '${email}'`
      );
      if (result.rows.length === 0) {
        return res.status(200).json({ message: "Email aman", account: result.rows });
      } else {
        return res.status(400).json({ message: "Email gak aman" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }


  //To check if username is exist, it's used for change password
  async function checkUsername(req, res) {
    const {username} = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE username = '${username}'`
      );
      if (result.rows.length === 0) {
        return res.status(200).json({ message: "Username aman", account: result.rows });
      } else {
        return res.status(400).json({ message: "Username gak aman"});
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }


  //To check if account is exist
  async function accountExist(req, res) {
    const { emailorname } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM users_table WHERE username = '${emailorname}' OR email = '${emailorname}'`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To Register Account12!", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }

  //To set and change phone number
  async function setPhoneNumber(req, res) {
    const { username} = req.params;
    const { phoneNumber } = req.body;
    try {
      const result = await pool.query(
        `UPDATE users_table SET phone_number = '${phoneNumber}' WHERE username = '${username}' RETURNING *`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success set phone number", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || ", account: result.rows});
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }

  //To set and change address
  async function setAddress (req, res) {
    const { username} = req.params;
    const { address } = req.body;
    try {
      const result = await pool.query(
        `UPDATE users_table SET address = '${address}' WHERE username = '${username}' RETURNING *`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To set address", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }


  //To top up
  async function topUp(req, res) {
    const { username} = req.params;
    const { balance } = req.body;
    try {
      const result = await pool.query(
        `UPDATE users_table SET balance = '${balance}' WHERE username = '${username}' RETURNING *`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To top up", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }
  

  //To insert Cloudinary link to PSQL database
  async function insertProfilePicture(req, res) {
    const { username} = req.params;
    const { linkPicture } = req.body;

    if (!linkPicture) {
      return res.status(400).json({messages: "Image URL is required"});
    }
    try {
      const result = await pool.query(
        `UPDATE users_table SET profile_picture = '${linkPicture}' WHERE username = '${username}' RETURNING *`
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To top up", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }
  
  //To adopt cat
  async function adoption(req, res) {
    const { username} = req.params;
    const {cat_id, adopt_date, email, phone_number, pickup_or_delivery, address} = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO adoption_table (user_id, cat_id, adopt_date, username,  email, phone_number, pickup_or_delivery, address, cat_name, cat_breed, cat_gender) SELECT  u.user_id, c.cat_id, '${adopt_date}', '${username}', '${email}', '${phone_number}',   '${pickup_or_delivery}', '${address}', c.cat_name, c.cat_breed, c.cat_gender FROM users_table u,  cat_table c WHERE u.username = '${username}'  AND c.cat_id = '${cat_id}' returning *`
        
      );
      if (result.rows.length !== 0) {
        return res.status(200).json({ message: "Success To top up", account: result.rows });
      } else {
        return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "There's something wrong", detail: error.message });
    }
  }
  

  module.exports = { register, login, forgotPassword, accountExist, checkEmail, checkUsername, setPhoneNumber, setAddress, topUp, insertProfilePicture, adoption};