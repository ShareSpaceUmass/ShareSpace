import React from 'react';

function Pin({ pinSize, imgSrc, size }) {
    return (
        <div className={`pin ${pinSize} items-center justify-center hover:bg-[#f2bbfa]`}>
            <img className="mainPic" src={imgSrc} alt="" />
            <h3 className='h3 font-ubuntu lg:max-w-[20px] font-thin'>Name</h3>
            <h3 className='h3 font-ubuntu lg:max-w-[20px] font-thin'>Age</h3>
            <h3 className='h3 font-ubuntu lg:max-w-[20px] font-thin'>Year</h3>
            <h3 className='h3 font-ubuntu lg:max-w-[20px] font-thin'>Major</h3>
        </div>
    );
}

export default Pin;