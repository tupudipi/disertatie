// pages/api/comments/specID/[specID].js

import getPool from '../../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const { specID } = req.query;

  try {
    const [rows, fields] = await pool.query('SELECT * FROM comments WHERE page_id = $1', [specID]);

    if (rows.length === 0) {
      res.json([]); // Send an empty array instead of an error
    } else {
      res.json(rows); // Send all comments, not only the first one
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
