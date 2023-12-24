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
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { email, image, name, id } = user;

        console.log({ email, name, image, id });

        // check if user exist
        const accountWithGoogleAuth = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        });

        const accountWithoutGoogleAuth = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        });
        const users = await prisma.user.findMany();

        if (!accountWithGoogleAuth && !accountWithoutGoogleAuth) {
          // create user
          await prisma.user.create({
            data: {
              email: email as string,
              name: name?.toLowerCase() as string,
              avatar: image as string,
              role: users.length === 0 ? "admin" : "user",
              uId: id,
              gh_username: name,
              veloz_token: shortUUID.generate(),
            },
          });
          return true;
        }

        if (accountWithGoogleAuth && !accountWithoutGoogleAuth) {
          return true;
        }

        if (!accountWithGoogleAuth && accountWithoutGoogleAuth) {
          throw new HttpException(
            RESPONSE_CODE.USER_ALREADY_EXIST,
            "OAuthAccountNotLinked",
            400
          );
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
