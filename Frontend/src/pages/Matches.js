import React from 'react'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import Pin from '../components/Pin';
import MatchData from '../assets/MatchData';
import "./Matches.css"
import TinderCard from 'react-tinder-card'
import { useState } from 'react'

function Matches() {
    const classStr = "bg-gray-100 rounded-md w-full p-1 my-1"
    return (
        <div className=" h-screen overflow-hidden">
            <Header2 />
            <div>
                <div className="flex flex-row justify-center align-middle h-screen">
                    <div className='filter h2 font-ubuntu text-white flex-col bg-gradient-to-r from-[#1b0638] to-[#21022abb] h-[80%] w-[20%] items-center justify-center mx-3 py-10 px-6 overflow-hidden rounded-3xl my-5'>
                        Filter
                        <div className='bg-white h-[350px] text-black text-sm overflow-scroll my-2 rounded-3xl'>
                            <div className='m-3 py-2'>
                                Name: <input className={classStr} type="text" />
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
                        <button className="btn btn-primary bg-[#d6baea] text-black xl:mb-6 font-ubuntu w-full">Search</button>
                    </div>
                    <div className='filter h2 font-ubuntu text-white bg-gradient-to-l from-[#1b0638] to-[#200328bb] h-[80%] w-[65%] items-center justify-center overflow-hidden rounded-3xl py-10 px-6 my-5 mx-3'>
                        Your Matches
                        <div className='flex-auto grid grid-flow-rows grid-cols-4 items-center justify-center m-3 overflow-scroll rounded-3xl w-[97%] h-[85%]'>
                            {
                                renderPins()
                            }
                        </div>
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