import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Card = ({cat_image, cat_name, description}) => {
    return (
        <div className="bg-primary rounded-lg p-2 mt-4 font-josefin_sans">
            <div className="flex">
                <img className = "rounded-xl w-[200px] m-2" src={cat_image} alt={cat_name} />
                <div className="card-body">
                    <h2 className="card-title text-[20pt] font-bold text-black">{cat_name}</h2>
                    <p className='text-[15pt] font-normal text-black'>{description.length > 100 ? description.substring(0, 101) + "..." : description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary bg-third rounded-2xl p-2 mt-1 text-[15pt] text-black font-bold hover:scale-[105%] transition-all">Know more about me</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;