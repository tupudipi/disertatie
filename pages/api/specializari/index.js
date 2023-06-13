// pages/api/specializari.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const [rows, fields] = await pool.query('SELECT * FROM `specializari`');
  
  res.json(rows);
}
