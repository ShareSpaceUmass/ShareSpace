import React from 'react'
import { Link } from "react-router-dom";
import logo from '../public/images/ShareSpaceLogo.png'

const Header = () => {
    return (
        <header class="bg-gradient-to-b from-[#fdfdfd] to-[#fcfcfc67]">
            <nav className='py-4 px-12 text-[18px] flex justify-between'>
                <Link to='/'>
                    <div>
                        <img className="w-[135px]" src={logo} alt="ShareSpace logo" />
                    </div>
                </Link>
                <div className='px-4'>
                    <Link to="/login">
                        <button className="btn-quaternary font-ubuntu px-4" data-aos='fade-down' data-aos-delay='600' style={{ margin: "5px" }}>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn-secondary font-ubuntu px-4" data-aos='fade-down' data-aos-delay='600' style={{ margin: "5px" }}>Register</button>
                    </Link>
                </div>
            </nav>
        </header >
    )
}

export default Header