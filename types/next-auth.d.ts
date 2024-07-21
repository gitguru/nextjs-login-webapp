import {
    type DefaultSession,
    type DefaultUser,
  } from "next-auth"
import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            id: number;
            usuario: string;
            contrasena?: string;
            tipo: number;
            nombre: string;
            email?: string;
        } & DefaultSession["user"]
    }
    interface User extends DefaultUser {
        id: number;
        usuario: string;
        contrasena?: string;
        tipo: number;
        nombre: string;
        email?: string;
    }
}