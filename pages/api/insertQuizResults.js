import getPool from '../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  try {
    const { email, domain, branches } = req.body;
    const [existingResult] = await pool.query('SELECT * FROM quizresults WHERE email = $1', [email]);
    if (existingResult.length > 0) {
      await pool.query('UPDATE quizresults SET domain = $1, branches = $2 WHERE email = $3', [domain, branches, email]);
      res.status(200).send('Data updated in database');
    } else {
      await pool.query('INSERT INTO quizresults (email, domain, branches) VALUES ($1, $2, $3)', [email, domain, branches]);
      res.status(200).send('Data inserted into database');
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
