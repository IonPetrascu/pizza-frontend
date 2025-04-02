import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Api } from "@/services/api-client";
import type { NextAuthOptions } from "next-auth";
import { UserRole } from "@/types/user";

// Опции авторизации
const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Отсутствуют учетные данные");
        }

        try {
          const user = await Api.auth.login(
            credentials.email,
            credentials.password
          );

          if (user && user.id) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              role: user.role as UserRole,
              token: user.token,
            };
          }
          throw new Error("Неверный ответ от сервера");
        } catch (error) {
          console.error("Ошибка авторизации:", error);
          throw new Error("Неверный email или пароль");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.token = token.token;
      return session;
    },
  },
};

// Экспортируем NextAuth правильно
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
