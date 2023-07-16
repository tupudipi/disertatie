import { getAuth, signOut } from "firebase/auth";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        return res.status(200).json({ message: 'User logged out successfully' });
    }).catch((error) => {
        // An error happened.
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during logout' });
    });
}
