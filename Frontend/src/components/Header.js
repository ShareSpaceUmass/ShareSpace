import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <p>About Us, Features,<Link to="/signup"> Signup</Link></p>
        </div>
    )
}

export default Header