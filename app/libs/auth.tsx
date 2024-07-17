import NextAuth, { NextAuthOptions } from "next-auth";
// import AppleProvider from "next-auth/providers/apple"
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from 'next-auth/providers/credentials';
import { validateUserCredentials } from '@/app/service/user';
import { NEXTAUTH_URL, NEXTAUTH_SECRET } from '@/config';
import { IUser } from '@/app/libs/types';

export const authOptions: NextAuthOptions = {
  // your configs
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
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
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith@company.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials) {
                throw new Error("No credentials.");
            }
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
        //   const res = await fetch("/your/endpoint", {
            // method: 'POST',
            // body: JSON.stringify(credentials),
            // headers: { "Content-Type": "application/json" }
        //   })
        //   const user = await res.json()
    
          // If no error and we have user data, return it
        //   if (res.ok && user) {
            // return user
        //   }
            // const user = {
            //     id:"c42a0600-7771-4cc5-a929-cf2a684141fd", 
            //     email: "john@user.com", 
            //     providerId: "c0c670a8-d1b8-4075-b582-9877f4be7be3", 
            //     name: "john paul", 
            //     role: "SERVICE_ACCOUNT"
            // };
            // return user;
          // Return null if user data could not be retrieved
        //   return null;
            const { username, password } = credentials;
            // console.log('authorize', email, password);
            const user = await validateUserCredentials(username, password).then((response) => response);
            // console.log('auth user', user);
            // return user;
            if (user?.error) {
                throw new Error(user.error);
            }
            return user as IUser;
        }
      })
  ],
  callbacks: {
    session: ({ session, token }) => {
        // console.log("Session Callback", { session, token });
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: `${token.firstName} ${token.lastName}`,
            firstName: token.firstName,
            lastName: token.lastName,
            // email: token.email,
            role: token.role,
            userStatus: token.userStatus,
            // providerId: token.providerId,
            randomKey: token.randomKey,
          },
        };
    },
    jwt: ({ token, user }) => {
        // console.log("JWT Callback", { token, user });
        if (user) {
          const u = user as unknown as any;
          console.log('uuuuuuuuu', user)
          return {
            ...token,
            id: u.id,
            // firstName: u.firstName,
            firstName: u.usuario,
            lastName: '', // u.lastName,
            // email: u.email,
            // role: u.role,
            role: u.tipo,
            // userStatus: u.userStatus,
            userStatus: 'ACTIVO',
            // providerId: u.providerId,
            randomKey: u.randomKey,
          };
        }
        return token;
    },
  },
};