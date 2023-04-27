import React from 'react';

function Pin({imgSrc, name, age, year, major}) {
    return (
        <div className={`pin items-center justify-center`}>
            <img className="mainPic rounded-xl object-cover h-[150px]" src={imgSrc} alt="" />
            <h3 className='h3 font-ubuntu text-sm font-semibold hover:text-[#4f4f51]'>Name: {name}</h3>
            <h3 className='h3 font-ubuntu text-sm font-semibold hover:text-[#4f4f51]'>Age: {age}</h3>
            <h3 className='h3 font-ubuntu text-sm font-semibold hover:text-[#4f4f51]'>Year: {year}</h3>
            <h3 className='h3 font-ubuntu text-sm font-semibold hover:text-[#4f4f51]'>Major: {major}</h3>
        </div>
    );
}

export default Pin;