import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import './CatList.css'

const CatList = () => {
    const { identifier } = useParams();
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
 <span className="cat-list-text">
    <Link to={`/cats/addcat/${identifier}`}>HOMEPAGE</Link>
          </span>
          <div className="cat-list-frame2">
          <span className="cat-list-text02">
            <span>OUR CAT</span>
          </span>
          </div>
          <span className="cat-list-text04">
            <span>ADOPT</span>
          </span>
        <span className="cat-list-text06">
          <span>CONTACT</span>
        </span>
        <span className="cat-list-text08">
        <span>DONATE</span>
        </span>
          <span className="cat-list-text10">
          <Link to={`/profilePage/${identifier}`}>PROFILE</Link>
          </span>
        
            
            <h1 className="flex flex-wrap px-2 justify-between">
            {cat.map((item, index) => (
                <Card key={index} cat_picture={item.cat_picture} cat_name={item.cat_name} description={item.description} catId = {item.cat_id} identifier = {identifier}/>
            ))}
            </h1>

            
        </div>
    );
};

export default CatList;