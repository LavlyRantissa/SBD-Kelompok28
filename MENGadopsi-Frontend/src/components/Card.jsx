import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";

const Card = ({cat_picture, cat_name, description, catId, identifier}) => {
    return (
        <div className="bg-third rounded-lg p-2 font-josefin_sans" style={{ marginTop: '7rem' , marginBottom: '-6rem'}}>

            <div className="flex">
                <img className = "rounded-xl w-[200px] m-2" src={cat_picture} alt={cat_name} />
                <div className="card-body">
                    <h2 className="card-title text-[20pt] font-bold text-black">{cat_name}</h2>
                    <p className='text-[15pt] font-normal text-black'>{description.length > 100 ? description.substring(0, 101) + "..." : description}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/adoption/${identifier}/${catId}`} className="btn btn-primary bg-primary rounded-2xl p-2 mt-1 text-[15pt] text-black font-bold hover:scale-[105%] transition-all">Know more about me</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;