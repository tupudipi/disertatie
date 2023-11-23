import getPool from '../../lib/db';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../src/app/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, nume, prenume, email, parola } = req.body;

  // Check the password against the same requirements as the front-end
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  if (!passwordPattern.test(parola)) {
    return res.status(400).json({ message: 'Password does not meet requirements.' });
  }

  const pool = getPool();

  try {
    // Check if username or email already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    ).rows;

    if (existingUsers.length) {
      return res.status(409).json({ message: 'Username or email already in use' });
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, parola)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await pool.query(
          'INSERT INTO users (username, nume, prenume, email, rol) VALUES ($1, $2, $3, $4, $5)',
          [username, nume, prenume, email, 'user']
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred during registration' });
  }

}
