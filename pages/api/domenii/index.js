// pages/api/domenii.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const [rows, fields] = await pool.query('SELECT * FROM `domeniistudiu`');
  
  res.json(rows);
}
