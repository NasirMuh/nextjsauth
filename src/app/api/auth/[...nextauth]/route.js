import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { connectMongoDb } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google" || account.provider === "github") {
                const { email, name } = user;
                try {

                    await connectMongoDb();
                    const existUser = await User.findOne({ email })

                    if (!existUser) {

                        const res = await fetch("http://localhost:3000/api/user", {
                            method: "POST",
                            Headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email, name,
                            }),

                        })
                        if (res.ok) {
                            return user;
                        }
                    }
                } catch (error) {
                    console.log("errror in api " + error)
                }

            }
            return user;
        },
    },
})
export { handler as GET, handler as POST }