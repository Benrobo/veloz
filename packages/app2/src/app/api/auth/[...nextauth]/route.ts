import NextAuth from "next-auth";
import shortUUID from "short-uuid";
import prisma from "../../../../prisma/prisma";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
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
      const users = await prisma.users.findMany();
      console.log({ users });
      if (account?.provider === "github") {
        const { image, username, name, id } = user as any;

        const accountWithGithubAuth =
          users && users.length > 0 ? users.find((u) => u.uId === id) : null;

        if (!accountWithGithubAuth) {
          // create user
          await prisma?.users?.create({
            data: {
              email: "",
              name: name?.toLowerCase() as string,
              avatar: image as string,
              role: !users || (users && users.length === 0) ? "admin" : "user",
              uId: id,
              gh_username: username,
              veloz_token: shortUUID.generate(),
            },
          });
          return true;
        }

        if (accountWithGithubAuth) {
          return false;
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

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
