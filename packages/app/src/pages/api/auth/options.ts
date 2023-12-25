import { RESPONSE_CODE } from "@veloz/shared/types";
import shortUUID from "short-uuid";
import prisma from "../config/prisma";
import HttpException from "../lib/exception";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      name: "github",
      clientId: process.env.GH_CLIENT_ID as string,
      clientSecret: process.env.GH_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        const { image, username, name, id } = user as any;

        // check if user exist
        const users = await prisma.users.findMany();
        const accountWithGithubAuth =
          users.length > 0 ? users.find((u) => u.uId === id) : null;

        if (!accountWithGithubAuth) {
          // create user
          await prisma.users.create({
            data: {
              email: "",
              name: name?.toLowerCase() as string,
              avatar: image as string,
              role: users.length === 0 ? "admin" : "user",
              uId: id,
              gh_username: username,
              veloz_token: shortUUID.generate(),
            },
          });
          return true;
        }

        if (accountWithGithubAuth) {
          return true;
        }
      }
      return true;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uId = user?.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token?.uId as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
};

export default nextAuthOptions;
