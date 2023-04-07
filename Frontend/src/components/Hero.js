import React from 'react';
import { HeroData } from '../data';
import { Link } from "react-router-dom";
import Header from '../components/Header';

const Hero = () => {
    const { title, subtitle, btnText, img } = HeroData
    return (
        <section className='lg:h-screen w-screen overflow-x-hidden'>
            <Header />
            <div className='container py-8 mx-auto overflow-hidden h-[80%] relative'>
                <div className='flex flex-col xl:flex-row items-center h-full py-6'>
                    <div className='text-center xl:text-left xl:absolute py-6'>
                        {/* Text */}
                        <h1 className="xl:h1 sm:h2 md:h2 lg:h2 xl:max-w-[600px] mb-6 font-ubuntu" data-aos='fade-down' data-aos-delay='400'>{title}</h1>
                        <p className="lead xl:max-w-[400px] lg:mb-8 font-ubuntu" data-aos='fade-down' data-aos-delay='500'>{subtitle}</p>
                        <button className="btn btn-primary xl:mb-6 font-ubuntu" data-aos='fade-down' data-aos-delay='600'>{btnText}</button>
                        <p className="font-ubuntu" data-aos='fade-up' data-aos-delay='600'>Already have an Account?
                            <Link to="/login"> Login</Link>
                        </p>
                    </div>
                    <div className='xl:absolute xl:-right-12 top-6' data-aos='fade-up' data-aos-delay='700'>
                        {/* Image */}
                        <img src={img} alt="image" className="xl:w-[680px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero