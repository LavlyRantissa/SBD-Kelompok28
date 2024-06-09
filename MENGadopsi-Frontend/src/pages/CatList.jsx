import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Card from "../components/Card";

const CatList = () => {
    const [cat, getData] = useState([]);

    const getCats = async () => {
        const response = await Axios.get('http://localhost:9453/cats/seecat');
        getData(response.data.data);
        console.log(response.data);
    }
    useEffect(() => {
        getCats()
    }, []);
    console.log(cat);
    return (
        <div className="bg-secondary p-4 w-screen h-screen">
            <h1 className="flex flex-wrap px-2 justify-between">
            {cat.map((item, index) => (
                <Card key={index} cat_picture={item.cat_picture} cat_name={item.cat_name} description={item.description} />
            ))}
            </h1>
        </div>
    );
};

export default CatList;