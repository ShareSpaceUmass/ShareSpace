import React from 'react';
import { Link } from "react-router-dom";
import Hero from '../components/Hero';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Features from '../components/Features'
import About from '../components/About'
import Header from '../components/Header'
import Nav from '../components/Nav'

function LandingPage() {
    //initialize aos - animation library
    Aos.init({ duration: 1800, offset: 0});
    return (
        <div className='overflow-hidden'>
            <Hero />
            <div>
                
            </div>
        </div>
    )
}

export default LandingPage