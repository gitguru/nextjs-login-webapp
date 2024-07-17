import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"

export default async function auth(req, res) {
    const providers = [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ]

    const session = {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    }

    const callbacks = {
        // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
        async session({ session, trigger, newSession }) {
          // Note, that `rest.session` can be any arbitrary object, remember to validate it!
          if (trigger === "update" && newSession?.name) {
            // You can update the session in the database if it's not already updated.
            // await adapter.updateUser(session.user.id, { name: newSession.name })
    
            // Make sure the updated value is reflected on the client
            session.name = newSession.name
          }
          return session
        }
    }

    const pages = {
        signIn: '/auth/signin',
    }

    const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

    // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
    if (isDefaultSigninPage) providers.pop()

    return await NextAuth({
        providers,
        session,
        // callbacks,
        // pages,
        logger: {
            error(code, metadata) {
              console.error(code, metadata)
            },
            warn(code) {
                console.warn(code)
            },
            debug(code, metadata) {
                console.debug(code, metadata)
            }
          }
    })
}
