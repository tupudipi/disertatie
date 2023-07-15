// pages/api/currentuser.js

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const email = user.email;
        // Add any other user properties you're interested in here
        return res.status(200).json({ user: { uid, email }});
      } else {
        // User is signed out
        return res.status(401).json({ message: 'User is not signed in' });
      }
    });
}
