import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Api } from "@/services/api-client";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    const user = await Api.auth.login(credentials.email, credentials.password);
                    console.log("USER FROM BACKEND", user);

                    if (user && user.id) {
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            token: user.token, // Добавляем токен
                        };
                    }
                    throw new Error("Invalid response from server");
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Invalid email or password");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.token = user.token; // Сохраняем токен в JWT
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.token = token.token; // Передаем токен в сессию
            console.log("session", session, token);
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };