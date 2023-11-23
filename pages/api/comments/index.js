// pages/api/comments/index.js

import getPool from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

// handle POST request
if (req.method === 'POST') {
  // Parse JSON body
  const { pageId, author, content, parent_id = 0 } = req.body;

  try {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result = await pool.query(
      'INSERT INTO comments (page_id, parent_id, author, content, status, date) VALUES ($1, $2, $3, $4, $5, $6)'        [pageId, parent_id, author, content, 'Approved', now]
    );
    
    // Get ID of last inserted row
    const insertId = result[0].insertId;

    // Query for the newly inserted comment
    const {rows, fields} = await pool.query('SELECT * FROM comments WHERE id = $1', [insertId]);

    // Return the newly inserted comment
    res.json(rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
  return;
}

  // handle GET request
  try {
    const {rows, fields} = await pool.query('SELECT * FROM comments');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
}
