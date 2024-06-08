import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Card = ({cat_image, cat_name, description}) => {
    const [data, getData] = useState([]);

    const getCats = async () => {
        const response = await Axios.get('http://localhost:9453/cats/seecat');
        getData(response.data);
    }
    useEffect(() => {
        getCats()
    }, []);
    
    return (
        <div className="bg-Primary_dark rounded-lg mt-4 w-[900px] mx-auto">
            <div className="flex">
                <img className = "rounded-xl w-[250px] m-2" src={cat_image} alt={cat_name} />
                <div className="card-body no-underline">
                    <h2 className="card-title text-[20pt] font-bold text-white">{cat_name}</h2>
                    <p className='text-[15pt] font-normal text-[#FFFFFF]'>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary bg-Third_dark rounded-md p-1 mt-2 hover:scale-[102%] transition-all">Know more about me</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*const CardGrid = () => {
    return (
        <div className="w-[100%] mt-4 p-4">
            <div className="flex flex-wrap px-3 justify-between">
                {cat.results.map((item) => (
                    <Card key={item.id} cat_name={item.cat_name} description={item.description} cat_image={item.cat_image} />
                ))}
            </div>
        </div>
    );
};*/

export default Card;