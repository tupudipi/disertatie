// db.js

import mysql from 'mysql2/promise';

let pool;

function getPool() {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    port: process.env.PORT
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
  });

  return pool;
}

export default getPool;
