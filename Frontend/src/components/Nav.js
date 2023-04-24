import React from 'react'
import { Link } from "react-router-dom";
import logo from '../public/images/ShareSpaceLogo.png'

const Nav = () => {
    return (
        <header class="bg-gradient-to-b from-[#ffffff] to-[#fbe2ff61]">
            <nav className='py-4 px-12 flex justify-between'>
                <Link to='/'>
                    <div>
                        <img className="w-28" src={logo} alt="ShareSpace logo" />
                    </div>
                </Link>
                <div class="flex">
                    <div>
                        <button className="btn-secondary xl:mb-6 font-ubuntu" style={{margin:"5px"}} data-aos='fade-down' data-aos-delay='600'>Matches</button>
                    </div>
                    <div>
                        <button className="btn-secondary xl:mb-6 font-ubuntu" style={{margin:"5px"}} data-aos='fade-down' data-aos-delay='600'>Profile</button>
                    </div>
                    <div>
                        <button className="btn-secondary xl:mb-6 font-ubuntu" style={{margin:"5px"}} data-aos='fade-down' data-aos-delay='600'>Chat</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Nav