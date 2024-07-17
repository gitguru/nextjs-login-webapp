import { DefaultSession, DefaultUser } from "next-auth";

export interface IUser extends DefaultUser {
    name?: string | '',
    usuario?: string | '',
    contrasena?: string | '',
    tipo?: number | -1,
    role?: number | -1,
}
