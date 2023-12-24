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
        const accountWithGithubAuth = await prisma.user.findFirst({
          where: {
            uId: id as string,
          },
        });
        const users = await prisma.user.findMany();

        if (!accountWithGithubAuth) {
          // create user
          await prisma.user.create({
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
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
};

export default nextAuthOptions;
