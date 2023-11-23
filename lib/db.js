// db.js
import pg from 'pg';
const { Pool } = pg;

let pool;

function getPool() {
  if (pool) {
    return pool;
  }
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })
  return pool;
}

export default getPool;
