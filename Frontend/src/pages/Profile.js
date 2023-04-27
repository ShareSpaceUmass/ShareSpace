import React from 'react'
import Header2 from '../components/Header2'

function Profile() {
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
                                Harry Potter
                            </div>
                            <div className="lead font-bold font-ubuntu my-2">
                                Major: Computer Science
                            </div>
                        </div>

                        <div className='flex justify-between'>
                                <div className="lead font-ubuntu">
                                    @potter_gryff
                                </div>
                                <div className="lead font-ubuntu">
                                    Year: Junior
                                </div>
                        </div>

                        <div className='flex justify-between my-4'>
                            <button className="btn-quaternary font-ubuntu p-2 rounded-tr-lg">
                                Message
                            </button>
                            <div className='lead font-ubuntu'>
                                Gender: Male
                            </div>
                        </div>
                    </div>
                    <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700"></hr>
                </div>
                <div className='text-white flex flex-none font-ubuntu items-center justify-center'>
                    <div className='flex flex-col h3 bg-gradient-to-r from-[#1b0638] to-[#21022abb] h-[400px] w-[600px] px-5 mx-2 rounded-3xl shadow-2xl'>
                        <div className='py-8 underline underline-offset-4'> Preferences</div>
                        <div className='grid grid-flow-rows grid-cols-1'>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'>Area: Sylvan, Northeast</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'>Interests: Football, Chess</div>
                            <div className='lead text-black text-center font-ubuntu items-center bg-[#f3e1fc] my-3 p-3 rounded-3xl'>Hobbies: Coding, Skydiving</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-top h3 h-[400px] w-[600px] bg-gradient-to-l from-[#1b0638] to-[#200328bb] px-5 mx-2 rounded-3xl shadow-2xl'>
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