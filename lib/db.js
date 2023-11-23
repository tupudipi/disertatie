// db.js
import mysql from 'mysql2/promise';

let pool;

function getPool() {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool("postgres://default:iAhfwXYu9rj5@ep-red-scene-30802515.eu-central-1.postgres.vercel-storage.com:5432/verceldb");

  return pool;
}

export default getPool;
