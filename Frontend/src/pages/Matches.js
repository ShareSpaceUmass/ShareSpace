import React from 'react'
import Header from '../components/Header'
import Pin from '../components/Pin';
import MatchData from '../assets/MatchData';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import "./Matches.css"

function Matches() {
    const classStr = "bg-gray-100 rounded-md w-full p-1 my-1"
    return (
        <div className="h-screen">
            <Header />
            <div>
                <div className="flex flex-row items-center justify-center align-middle h-screen">
                    <div className='h2 font-ubuntu text-white flex-col bg-gradient-to-r from-[#1b0638] to-[#21022abb] h-[80%] w-[20%] items-center justify-center mx-6 py-10 px-6 overflow-hidden'>
                        Filter
                        <div className='bg-white h-[320px] text-black text-sm overflow-scroll my-2'>
                            <div className='m-3 py-2'>
                                Name: <input className={classStr} type="text"/>
                                Major: <input className={classStr} type="text" />
                                Age: <input className={classStr} type="text" />
                                Year: <input className={classStr} type="text" />
                                Area: <input className={classStr} type="text" />
                                Building: <input className={classStr} type="text" />
                                Guests: <input className={classStr} type="text" />
                                Noise: <input className={classStr} type="text" />
                                Pets: <input className={classStr} type="text" />
                                Smoking: <input className={classStr} type="text" />
                                Cleanliness: <input className={classStr} type="text" />
                            </div>
                        </div>
                        <div>
                            <button className="btn-secondary xl:mb-6 font-ubuntu" data-aos='fade-down' data-aos-delay='600'>Register</button>
                        </div>
                    </div>
                    <div className='font-ubuntu text-[12px] flex-auto grid grid-flow-rows grid-cols-5 bg-gradient-to-l from-[#1b0638] to-[#200328bb] h-[80%] w-[65%] items-center justify-center mx-6 my-6 p-8 overflow-scroll'>
                        {
                            renderPins()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
    function renderPins() {
        return MatchData.map((data) => (
            <Pin key={data.id} imgSrc={data.imgSrc} name={data.name} age={data.age} year={data.year} major={data.major} />
        ));
    }
}

export default Matches