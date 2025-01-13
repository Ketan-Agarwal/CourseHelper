const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    connectionTimeoutMillis: 10000,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false, // For development purposes, set to true in production
    },
});

module.exports = pool;