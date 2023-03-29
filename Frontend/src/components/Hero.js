import React from 'react'
import { HeroData } from '../data'
import { Link } from "react-router-dom";

import Header from '../components/Header'

const Hero = () => {
    const { title, subtitle, btnText, img } = HeroData
    return (
        <section className='lg:h-screen w-screen py-12'>
            <Header />
            <div className='container mx-auto overflow-hidden h-full relative'>
                <div className='flex flex-col xl:flex-row items-center h-full md:py-24'>
                    <div className='text-center xl:text-left xl:absolute'>
                        {/* Text */}
                        <h1 className="h1 xl:max-w-[600px] mb-6 lg:mb-8 font-serif" data-aos='fade-down' data-aos-delay='400'>{title}</h1>
                        <p className="lead xl:max-w-[380px] mb-6 lg:mb-8 font-serif" data-aos='fade-down' data-aos-delay='500'>{subtitle}</p>
                        <button className="btn btn-primary mb-8 xl:mb-0" data-aos='fade-down' data-aos-delay='600'>{btnText}</button>
                    </div>

                    <div className='sm:w-[350px] xl:absolute xl:-right-12 xl:bottom-6 xl:w-[680px]' data-aos='fade-up' data-aos-delay='700'>
                        {/* Image */}
                        <img src={img} alt="image" />
                    </div>
                    <div className='xl:relative mb-6 top-[260px]' data-aos='fade-up' data-aos-delay='600'>
                        <p className="font-serif">Already have an Account?
                            <Link to="/login"> Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero