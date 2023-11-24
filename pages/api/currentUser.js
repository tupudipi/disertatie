// pages/api/currentuser.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getPool from '../../lib/db';
import app from '../../src/app/firebase';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const email = user.email;
            
            // fetch user details from database
            const pool = getPool();
            try {
                const {rows, fields} = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
                const userDetails = rows[0]; // Get the first result

                if (!userDetails) {
                    // No user found in database with the given email
                    return res.status(404).json({ message: 'User not found' });
                }

                return res.status(200).json({ user: { ...userDetails }});
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            } finally {
                if (pool) {
                  await pool.end();
                }
            }

        } else {
            // User is signed out
            return res.status(401).json({ message: 'User is not signed in' });
        }
    });
}
