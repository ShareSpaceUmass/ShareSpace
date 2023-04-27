import { fontFamily } from '@mui/system';
import React from 'react'
import { Link } from "react-router-dom";
import logo from '../public/images/ShareSpaceLogo.png'

const Header2 = () => {
    const location = window.location.pathname;
    return (
        <header class="bg-gradient-to-b from-[#fdfdfd] to-[#fcfcfc67]">
            <nav className='py-2 px-12 flex justify-between'>
                <Link to='/'>
                    <div>
                        <img className="w-[135px]" src={logo} alt="ShareSpace logo" />
                    </div>
                </Link>
                <div className='w-screen flex justify-center py-[12px] text-[18px]'>
                    <Link to="/">
                        <button className={location == "/" ? "underline underline-offset-8 decoration-[#b175deaa] font-ubuntu px-2" : "font-ubuntu px-2"}  style={{ margin: "5px" }}>Home</button>
                    </Link>
                    <Link to="/preferences">
                        <button className={location == "/preferences" ? "underline underline-offset-8 decoration-[#b175deaa] font-ubuntu px-2" : "font-ubuntu px-2"} style={{ margin: "5px" }}>Preferences</button>
                    </Link>
                    <Link to="/profile">
                        <button className={location == "/profile" ? "underline underline-offset-8 decoration-[#b175deaa] font-ubuntu px-2" : "font-ubuntu px-2"} style={{ margin: "5px"}}>Profile</button>
                    </Link>
                    <Link to="/matches">
                        <button className={location == "/matches" ? "underline underline-offset-8 decoration-[#b175deaa] font-ubuntu px-2" : "font-ubuntu px-2"} style={{ margin: "5px" }}>Matches</button>
                    </Link>
                    <Link to="/chat">
                        <button className={location == "/chat" ? "underline underline-offset-8 decoration-[#b175deaa] font-ubuntu px-2" : "font-ubuntu px-2"} style={{ margin: "5px" }}>Chats</button>
                    </Link>
                </div>
                <div className='w-16 h-16 rounded-full object-cover my-1'>
                    <Link to='/profile'>
                        <img
                            src="https://api.dicebear.com/6.x/initials/svg?seed=JohnDoe"
                            alt="avatar"
                            className='rounded-full w-12 h-12'
                        />
                    </Link>
                </div>
            </nav>
        </header >
    )
}

export default Header2