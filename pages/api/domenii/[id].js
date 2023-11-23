// pages/api/domenii/[id].js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const { id } = req.query;

  let connection;
  try {
    connection = await pool.connect();
    const { rows, fields } = await connection.query('SELECT * FROM domeniistudiu WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Domeniu not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}