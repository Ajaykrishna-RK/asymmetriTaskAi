import SigninForm from '@/components/auth/SignInForm'
import React from 'react'

function page() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <SigninForm />
        </div>
    )
}

export default page