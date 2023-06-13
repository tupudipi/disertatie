// db.js

import mysql from 'mysql2/promise';

let pool;

function getPool() {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool({
    host: 'localhost',
    user: 'tudi',
    password: 'cico01',
    database: 'diztestdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool;
}

export default getPool;
