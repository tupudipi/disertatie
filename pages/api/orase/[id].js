// pages/api/orase/[id].js
import getPool from '../../../lib/db';

export default async function handler(req, res) {
    const pool = getPool();
    
    const { id } = req.query;
    
    // Sanitize input to prevent SQL injection
    const [rows, fields] = await pool.execute('SELECT * FROM `orase` WHERE `id` = ?', [id]);
    
    // If a comment with the specified ID was not found, return a 404 error
    if (rows.length === 0) {
        res.status(404).json({ message: 'Oras not found' });
    } else {
        res.json(rows[0]);
    }
    }
    