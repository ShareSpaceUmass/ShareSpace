import React from 'react'
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <>
            <div>
                <h1>Welcome to ShareSpace!</h1>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/signup">Signup</Link>
            </div>
        </>
    )
}

export default LandingPage