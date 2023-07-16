// pages/api/comments/index.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

// handle POST request
if (req.method === 'POST') {
  // Parse JSON body
  const { pageId, author, content, parent_id = 0 } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result = await connection.query(
        'INSERT INTO `comments` (`page_id`, `parent_id`, `author`, `content`, `status`, `date`) VALUES (?, ?, ?, ?, ?, ?)', 
        [pageId, parent_id, author, content, 'Approved', now]
    );
    
    // Get ID of last inserted row
    const insertId = result[0].insertId;

    // Query for the newly inserted comment
    const [rows] = await connection.query('SELECT * FROM `comments` WHERE `id` = ?', [insertId]);

    // Return the newly inserted comment
    res.json(rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
  return;
}

  // handle GET request
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM `comments`');
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
