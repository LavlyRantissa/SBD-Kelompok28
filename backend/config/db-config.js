const { Pool } = require("pg");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE,
    port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = { pool };