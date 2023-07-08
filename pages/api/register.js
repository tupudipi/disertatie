// pages/api/register.js
import bcrypt from 'bcryptjs';
import getPool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, nume, prenume, email, parola } = req.body;

  const pool = getPool();

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(parola, salt);

    await pool.query(
      'INSERT INTO users (username, nume, prenume, email, parola, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [username, nume, prenume, email, hashedPassword, 'user']
    );

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred during registration' });
  }
}
