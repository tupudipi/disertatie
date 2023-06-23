// pages/api/universitati/[id].js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  const { id } = req.query;

  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM `universitati` WHERE `id` = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Universitate not found' });
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