const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Flexible MySQL Connection Pool
 * Works for both Local (XAMPP) and Remote (Railway)
 */
const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
};

// Add SSL only if connecting to a remote host (like Railway)
if (process.env.DB_HOST !== '127.0.0.1' && process.env.DB_HOST !== 'localhost') {
    poolConfig.ssl = {
        rejectUnauthorized: false
    };
}

const pool = mysql.createPool(poolConfig);

// Test connection
pool.getConnection()
    .then(connection => {
        console.log('✅ Database connection established successfully');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });

module.exports = pool;
