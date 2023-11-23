import getPool from "../../../lib/db";

export default async function handler(req, res) {
  const pool = getPool();

  try {
    const {rows, fields} = await pool.query('SELECT * FROM quizresults');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}