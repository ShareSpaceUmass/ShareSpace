import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='px-16 bg-[#f7eeff] py-2'>
            <p className="font-ubuntu">About Us | Features | <Link to="/signup"> Signup</Link></p>
        </div>
    )
}

export default Header