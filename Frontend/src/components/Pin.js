import React from 'react';

function Pin({ pinSize, imgSrc, size, season }) {
    return (
        <div className={`pin ${pinSize}`}>
            <img className="mainPic" src={imgSrc} alt="" />
        </div>
    );
}

export default Pin;