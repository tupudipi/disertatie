// db.js
import pg from 'pg';
const { Pool } = pg;

function getPool() {
  if (pool) {
    return pool;
  }

  // pool = mysql.createPool({
  //   host: "ep-red-scene-30802515-pooler.eu-central-1.postgres.vercel-storage.com",
  //   user: "default",
  //   password: "iAhfwXYu9rj5",
  //   database: "verceldb",
  //   port: 5432
  //   // waitForConnections: true,
  //   // connectionLimit: 10,
  //   // queueLimit: 0
  // });

  const pool = new Pool({

  connectionString: "postgres://default:iAhfwXYu9rj5@ep-red-scene-30802515-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require",

})

  return pool;
}

export default getPool;
