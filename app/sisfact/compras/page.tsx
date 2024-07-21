'use client'

import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Compras() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return <p>Signed in as {session?.user?.nombre}</p>
    }

    // return <a href="/api/auth/signin">Sign in</a>
    // return (
    //     <button onClick={() => signIn()}>Sign in</button>
    // )
    return (
        <>
            <a href="/api/auth/signin">Sign in</a>
        </>
    )
}