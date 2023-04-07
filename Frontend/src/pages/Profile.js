import React from 'react'
import Header from '../components/Header'

function Profile() {
    return (
        <div>
        <Header />
        <div className='h-screen py-8'>
            
            <div className='items-center h-screen'>
                <div className='flex mx-auto my-10 p-8 bg-gradient-to-b from-[#ffffff9b] to-[#ffffff00] relative w-[85%] h-[15%] rounded-3xl'>
                    <div className='w-[90px] h-[90px] my-7 mx-20'>
                        <img
                            src="https://api.dicebear.com/6.x/initials/svg?seed=JohnDoe"
                            alt="avatar"
                            className='rounded-3xl' />
                    </div>
                </div>

                <div className='relative mx-auto w-[80%] font-bold font-ubuntu'>
                    <div className='flex mx-20 justify-between'>
                        <div className="h3 font-bold font-ubuntu my-2">
                            John Doe
                        </div>
                        <div className="lead font-bold font-ubuntu my-2">
                            Major: Computer Science
                        </div>
                    </div>

                    <div className='flex mx-20'>
                        <div className="font-ubuntu flex-initial">
                            @johndoe
                        </div>
                        <div className="font-ubuntu flex-initial w-4" />
                        <div className="font-ubuntu flex-initial w-30">
                            Junior
                        </div>
                    </div>

                    <div className='flex mx-20 my-4'>
                        <button className="btn-quaternary font-ubuntu p-2 rounded-tr-lg">
                            Message
                        </button>
                    </div>
                    <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700"></hr>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Profile