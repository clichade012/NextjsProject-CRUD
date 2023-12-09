import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './lib/auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import conn from '@/lib/pg';

// const bcrypt = "anuj";
async function getUser(userid) {
    console.log("userid",userid);
    try {
        const user = await conn.query(`SELECT * FROM admin_login WHERE email='${userid}'`);
        console.log('USER', user?.rows)
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) { 
                const parsedCredentials = z
                    .object({ userid: z.string(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { userid, password } = parsedCredentials.data;
                    const user = await getUser(userid);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log('PASSWORDS MATCH,', passwordsMatch)
                    if (passwordsMatch)
                        return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});