import getPool from '../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  let connection;
  try {
    connection = await pool.getConnection();
    const { email, domain, branches } = req.body;
    const [existingResult] = await connection.query('SELECT * FROM `quizresults` WHERE `email` = ?', [email]);
    if (existingResult.length > 0) {
      await connection.query('UPDATE `quizresults` SET `domain` = ?, `branches` = ? WHERE `email` = ?', [domain, branches, email]);
      res.status(200).send('Data updated in database');
    } else {
      await connection.query('INSERT INTO `quizresults` (email, domain, branches) VALUES (?, ?, ?)', [email, domain, branches]);
      res.status(200).send('Data inserted into database');
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
