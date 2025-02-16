import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { Adapter } from "next-auth/adapters";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECERT || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw Error("credential are not provided");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!user) throw Error("invalid cradentials");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user?.password
          );

          if (!isPasswordCorrect) throw Error("invalid cradentials");

          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
};
