import React from 'react'
import Header2 from '../components/Header2'
import { ProfileData } from '../profileInfo'

//Renders a profile page dynamically given user DATA !MUST BE UPDATED TO ACCEPT USER DATA!
function Profile() {
    const { Name, UserName, Gender, Year, Age, Major, Cleanliness, Guests, TimeSpent, Noise, Pets, Lifestyle } = ProfileData
    return (
        <div>
            <Header2 />
            <div className='h-full py-8 items-center justify-center'>
                <div>
                    <div className='w-[90px] h-[90px] mx-[140px]'>
                        <img
                            src="https://api.dicebear.com/6.x/initials/svg?seed=HarryPotter"
                            alt="avatar"
                            className='rounded-3xl' />
                    </div>
                    <div className='relative mx-auto w-[80%] font-bold font-ubuntu'>
                        <div className='flex justify-between'>
                            <div className="h3 font-bold font-ubuntu my-2">
                                {Name}
                            </div>
                            <div className="lead font-bold font-ubuntu my-2">
                                Age: {Age}
                            </div>
                        </div>

                        <div className='flex justify-between'>
                                <div className="lead font-ubuntu">
                                    @{UserName}
                                </div>
                                <div className="lead font-ubuntu">
                                    Year: {Year}
                                </div>
                        </div>

                        <div className='flex justify-between my-4'>
                            <button className="btn-secondary font-ubuntu p-2 rounded-tr-bl-lg">
                                Message
                            </button>
                            <div className='lead font-ubuntu'>
                                Gender: {Gender}
                            </div>
                        </div>
                    </div>
                    <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700"></hr>
                </div>
                <div className='text-white flex flex-none font-ubuntu items-center justify-center'>
                    <div className='flex flex-col h3 bg-gradient-to-r from-[#1b0638] to-[#21022abb] h-[650px] w-[600px] px-5 mx-2 rounded-3xl shadow-2xl'>
                        <div className='py-8 underline underline-offset-4'> About Me</div>
                        <div className='grid grid-flow-rows grid-cols-1'>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'><u>Major</u>: {Major}</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'><u>Lifestyle</u>: {Lifestyle}</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'><u>Cleanliness</u>: {Cleanliness}</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'><u>Guests</u>: {Guests}</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'><u>Time Spent in Room</u>: {TimeSpent}</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'><u>Lifestyle</u>: {Lifestyle}</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-top h3 h-[650px] w-[600px] bg-gradient-to-l from-[#1b0638] to-[#200328bb] px-5 mx-2 rounded-3xl shadow-2xl'>
                        <div className='py-8 underline underline-offset-4'>
                            Bio
                        </div>
                        <div className='text-[15px]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis
                            sagittis viverra, nunc libero bibendum augue, in lacinia nisl velit sit amet
                            nulla. Sed euismod, nisl quis sagittis viverra, nunc libero bibendum augue, in
                            lacinia nisl velit sit amet nulla. Sed euismod, nisl quis sagittis viverra,
                            nunc libero bibendum augue, in lacinia nisl velit sit amet nulla. Sed euismod,
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile