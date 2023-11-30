// lib/db.js
import pg from 'pg';
const { Pool } = pg;

let pool;

export function getPool() {
  try {
    if (!pool) {
      pool = new Pool({
        connectionString: process.env.POSTGRES_URL + "?sslmode=require",
      });
    }
    return pool;
  } catch (error) {
    console.error("Error creating PostgreSQL connection pool:", error);
    throw error; // rethrow the error to be caught in the handler
  }
}

export default getPool;
