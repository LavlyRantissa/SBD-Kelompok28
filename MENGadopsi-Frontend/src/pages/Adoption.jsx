import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Adoption.css'

const Adoption = () => {

    const [pickup, setPickUp] = useState(false);
    const [delivery, setDelivery] = useState(false);

    const handlePickup = () => {
        setPickUp(!pickup);
        setDelivery(false);
    };

    const handleDelivery = () => {
        setDelivery(!delivery);
        setPickUp(false);
    };
  return (
    <div className="homepage-container">
      <div className="homepage-homepage">
        <div className="homepage-group1">
        <img
            src="https://res.cloudinary.com/dramhnsj2/image/upload/v1717589840/Frontend-Components/y6e54qbvtwgyyttiimjd.png"
            alt="MENGadopsi-logo"
            className="profile-page-bg-sub-screenshot2024060301040011"
          />
            <div className="w-[1390.01px] h-[0px] left-[35px] top-[140px] absolute border border-orange-300"></div>
            <div className="w-[1390.01px] h-[0px] left-[35px] top-[980px] absolute border border-orange-300"></div>
            <div className="w-[0px] h-[600px] left-[720px] top-[280px] absolute border border-orange-300"></div>
          <span className="homepage-text">
            <span>HOMEPAGE</span>
          </span>
          <span className="homepage-text02">
            <span>OUR CAT</span>
          </span>
          <span className="homepage-text04">
            <span>CONTACT</span>
          </span>
        </div>
        <span className="homepage-text06">
          <span>DONATE</span>
        </span>
        <span className="homepage-text08">
          <span>PROFILE</span>
        </span>
        <div className="homepage-frame2">
          <span className="homepage-text10">
            <span>ADOPT</span>
          </span>
        </div>
        <span className="homepage-text12">
          <span>Name</span>
        </span>
        <span className="homepage-text14">
          <span>E-Mail</span>
        </span>
        <span className="homepage-text16">
          <span>Phone Number</span>
        </span>
        <span className="homepage-text18">
          <span>Cat’s Name</span>
        </span>
        <span className="homepage-text20">
          <span>Cat’s Gender</span>
        </span>
        <span className="homepage-text22">
          <span>Cat’s Breed</span>
        </span>
        <span className="homepage-text24">
          <span>Cat Adoption Form</span>
        </span>
        <button className="homepage-frame00-button">
          <span className="homepage-text26">
            <span>Adopt</span>
          </span>
        </button>
        <button
            className={`w-[15.01px] h-[15px] left-[545px] top-[670px] bg-stone-100 rounded-full absolute border ${delivery ? 'bg-stone-700' : 'bg-stone-200'}`}
            onClick={handleDelivery}
        ></button>
        <button
            className={`w-[15.01px] h-[15px] left-[420px] top-[670px] rounded-full absolute border ${pickup ? 'bg-stone-700' : 'bg-stone-200'}`}
            onClick={handlePickup}
        ></button>
        <input
          type="text"
          placeholder="Name"
          className="homepage-frame01-input-field"
        />
        <input
          type="text"
          placeholder="Cat’s Name"
          className="homepage-frame01-input-field1"
        />
        <input
          type="text"
          placeholder="Cat’s Gender"
          className="homepage-frame01-input-field2"
        />
        <input
          type="text"
          placeholder="Cat’s Breed"
          className="homepage-frame01-input-field3"
        />
        <input
          type="text"
          placeholder="E-Mail"
          className="homepage-frame01-input-field4"
        />
        <input
          type="text"
          placeholder="Phone number"
          className="homepage-frame01-input-field5"
        />
        <span className="homepage-text28">
          <span>Address</span>
        </span>
        <span className="homepage-text30">
          <span>Pick Up/Delivery</span>
        </span>
        <input
          type="text"
          placeholder="If user choose ‘Pick Up’, this field \nwill be filled with shelter’s address automatically. If user choose ‘Delivery’, user must fill this field. "
          className="homepage-frame01-input-field6"
        />
       
        <span className="homepage-text32">
          <span>Pick Up</span>
        </span>
        <span className="homepage-text34">
          <span>Delivery</span>
        </span>
        
      </div>
    </div>
  )
}

export default Adoption

