import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getConfig from "next/config";
import { useSession } from "next-auth/react";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    error: "/auth/signin?authError=Something went wrong", // Error code passed in query string as ?error=
  },
  providers: [
    CredentialsProvider({
      id: "credentials_login",
      async authorize(credentials) {
        const res = await fetch(`${baseUrl}/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const resp = await res.json();
        if (res.ok && resp.user) {
          return resp.user;
        }
        throw `/auth/signin`;
      },
    }),
  ],
  events: {
    async signIn(message) {
      /* on successful sign in */
      // registration/login via provider
      if (message.account?.provider) {
        const dataUser = message.user;
        dataUser.provider = message.account.provider;
        dataUser.providerId = message.account.id;
        await fetch(`${baseUrl}/provider`, {
          method: "POST",
          body: JSON.stringify(dataUser),
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  },
  debug: true,
});
