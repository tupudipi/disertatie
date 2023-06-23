// pages/api/specializari.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM `specializari`');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}