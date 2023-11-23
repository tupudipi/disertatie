// pages/api/universitati/[id].js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const { id } = req.query;

  try {
    const [rows, fields] = await pool.query('SELECT * FROM universitati WHERE id = $1', [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Universitate not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}