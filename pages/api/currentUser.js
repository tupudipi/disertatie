import { getAuth, onAuthStateChanged } from "firebase/auth";
import getPool from '../../lib/db';
import app from '../../src/app/firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const auth = getAuth(app);
  const pool = getPool();

  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        // User is signed in
        const email = user.email;

        // fetch user details from database
        const { rows, fields } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const userDetails = rows[0]; // Get the first result

        if (!userDetails) {
          // No user found in database with the given email
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: { ...userDetails } });
      } else {
        // User is signed out
        return res.status(401).json({ message: 'User is not signed in' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
}
