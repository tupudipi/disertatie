// pages/api/domenii.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  let connection;
  try {
    connection = await pool.connect();
    const [rows, fields] = await connection.query('SELECT * FROM domeniistudiu');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}