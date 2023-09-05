'use client'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Login = () => {
    const session = useSession();
    console.log(session)
    console.log(session.data?.user?.email)
    if (session.status === "loading") {
        return <p>loading...</p>
    }
    if (session.status === "authenticated") {
        return (
            <>Welcome to {session.data?.user?.email}
                <button onClick={() => signOut()}>LogOut</button>

                {/* <button onClick={() => signOut("google")}>LogOut</button> */}
            </>
        )
    }
    if (session.status === "unauthenticated") {
        return (
            <>
                <button onClick={() => signIn("github")}> GitHub | </button>

                <button onClick={() => signIn("google")}> Google</button>
            </>
        )
    }
    return (
        <div></div>
    )
}

export default Login