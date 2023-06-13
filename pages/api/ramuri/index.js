// pages/api/ramuri.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const [rows, fields] = await pool.query('SELECT * FROM `ramuri`');
  
  res.json(rows);
}
