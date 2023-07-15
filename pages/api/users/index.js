// pages/api/users.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM `users`');
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