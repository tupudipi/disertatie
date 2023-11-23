// db.js
import pg from 'pg';
const { Pool } = pg;

function getPool() {
  if (pool) {
    return pool;
  }
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })
  return pool;
}

export default getPool;
