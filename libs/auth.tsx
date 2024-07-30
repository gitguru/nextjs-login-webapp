import NextAuth, { NextAuthOptions } from "next-auth";
// import AppleProvider from "next-auth/providers/apple"
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from 'next-auth/providers/credentials';
import { validarCredencialesDeUsuario } from '@/service/user';
import { NEXTAUTH_URL, NEXTAUTH_SECRET } from '@/config';

export const authOptions: NextAuthOptions = {
  // your configs
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },  
  pages: {
    // signIn: '/login',
    signIn: '/',
  },
  providers: [
    // OAuth authentication providers
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith@company.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req): Promise<any> {
            if (!credentials) {
                throw new Error("No ha presentado sus credenciales.");
            }
            const { username, password } = credentials;
            const user = await validarCredencialesDeUsuario(username, password).then((response) => response);

            if (user[0]) {
              const loggedUser = user[0];
              return {
                id: loggedUser.id,
                usuario: loggedUser.usuario,
                tipo: loggedUser.tipo,
                nombre: loggedUser.nombre,
              } as any
            } else {
              return null;
            }
        }
      })
  ],
  callbacks: {
    async session({ session, token, user }): Promise<any> {
        if (token) {
          console.log('token', token)
          return {
            ...session,
            user: token.user
          }
        } else {
          return session;
        }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('token', token, 'user', user, 'account', account, 'profile', profile);
      if (user) {
        token.user = user
        return token
        // return {
        //   ...token, 
        //   user: user
        // }
      } else {
        return token
      }
    }
  },
};