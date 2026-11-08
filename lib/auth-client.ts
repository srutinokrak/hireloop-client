import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
// Type-only import: gives the client the types of our auth config (like the
// extra "role" field) without putting any server code in the browser bundle.
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
