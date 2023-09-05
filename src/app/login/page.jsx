'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Login = () => {
    const session = useSession();
    console.log(session)
    if (session.status === "loading") {
        return <p>loading...</p>
    }
    if (session.status === "authenticated") {
        return <button onClick={() => signOut("google")}>LogOut</button>
    }
    if (session.status === "unauthenticated") {
        return <button onClick={() => signIn("google")}>Sign In With Google</button>
    }
    return (
        <div>login page</div>
    )
}

export default Login