import getPool from '../../lib/db';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../src/app/firebase'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { username, parola } = req.body;

    try {
        // Check if username or email already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        ).rows;

        if (existingUsers.length) {
            const user = existingUsers[0];
            const email = user.email;
            const nume = user.nume;
            const prenume = user.prenume;
            const rol = user.rol;

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, parola)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    return res.status(200).json({ message: `User ${username} logged in successfully`, user: { username, nume, prenume, email, rol } });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during registration' });
    }

}