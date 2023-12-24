import NextAuth from "next-auth";
import nextAuthOptions from "./options";

const handler = NextAuth(nextAuthOptions);

export default handler;
