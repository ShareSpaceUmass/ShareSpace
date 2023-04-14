import React from 'react'
import Header from '../components/Header'
import Pin from '../components/Pin';
import MatchData from '../assets/MatchData';
import "./Matches.css"

function Matches() {
    return (
        <div className="h-screen">
            <Header />
            <div>
                <div className="flex flex-row items-center justify-center align-middle h-screen">
                    <div className='h2 font-ubuntu text-white flex-col rounded-3xl bg-[#cc85f0f9] h-[80%] w-[20%] items-center justify-center mx-6 p-8 overflow-scroll'>
                        Filter
                    </div>
                    <div className='h2 font-ubuntu flex-1 grid grid-flow-rows auto-rows-fr grid-cols-5 text-white rounded-3xl bg-slate-600 h-[80%] w-[65%] items-center justify-center mx-6 my-6 p-8 overflow-scroll'>
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
            <Pin key={data.id} pinSize={data.size} imgSrc={data.imgSrc} />
        ));
    }
}

export default Matches