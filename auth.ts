import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    session: {
        maxAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async signIn({ user }) {
            return user.email === process.env.ADMIN_EMAIL;
        },
    }
})