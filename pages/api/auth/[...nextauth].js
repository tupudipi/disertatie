import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import getPool from '../../../lib/db';

export default NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const pool = getPool();
                const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [credentials.username]);
                const user = users[0];

                if (user) {
                    const isValid = bcrypt.compareSync(credentials.password, user.parola);
                    if (isValid) {
                        return { id: user.id, name: user.username, email: user.email }
                    } else {
                        throw new Error('Invalid password')
                    }
                } else {
                    throw new Error('No user found')
                }
            },
        }),
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session(session, token) {
            session.userId = token.id;
            return session
        },
    },
})
