import React from 'react'
import { Link } from "react-router-dom";
import logo from '../public/images/ShareSpaceLogo.png'

const Header = () => {
    return (
        <header class="bg-gradient-to-b from-[#ffffff] to-[#fbe2ff61]">
            <nav className='py-4 px-12 flex justify-between'>
                <Link to='/'>
                    <div>
                        <img className="w-28" src={logo} alt="ShareSpace logo" />
                    </div>
                </Link>
                <div>
                    <Link to="/login">
                        <button className="btn-secondary xl:mb-6 font-ubuntu" data-aos='fade-down' data-aos-delay='600' style={{ margin: "5px" }}>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn-secondary xl:mb-6 font-ubuntu" data-aos='fade-down' data-aos-delay='600' style={{ margin: "5px" }}>Register</button>
                    </Link>
                </div>
            </nav>
        </header >
    )
}

export default Header