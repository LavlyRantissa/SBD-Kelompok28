import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import './Adoption.css'

const Adoption = () => {
    const { identifier, catId} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pickUpOrDelivery, setPickUpOrDelivery] = useState('');
    const [deliveryAddress, setdDeliveryAddress] = useState('');
    const [adoptDate, setAdoptDate] = useState('');
    const [catDetail, setCatDetail] = useState(null);
    const [pickup, setPickUp] = useState(false);
    const [delivery, setDelivery] = useState(false);
    const [toastFailed, setFailed] = useState(false);
    const [toastSuccess, setSuccess] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Hanya ambil tanggal, bukan waktu
        setAdoptDate(today);
    }, []);

    useEffect(() => {
        const getDetails = async () => {
          try {
            const response = await fetch(`http://localhost:9453/cats/${encodeURIComponent(catId)}`);
            if (response.status === 200) {
              const data = await response.json();
              setCatDetail(data.data[0]);
            } else if (response.status === 404) {
              alert("Cat not found");
            } else {
              alert("Failed to get Cat details");
            }
          } catch (error) {
            console.error(error);
            alert("Failed to get cat details");
          }
        };
    
        getDetails();
      }, [catId]);

    const handlePickup = () => {
        setPickUp(!pickup);
        setDelivery(false);
        setPickUpOrDelivery('PICK UP');
        setdDeliveryAddress('');

    };

    const handleDelivery = () => {

        setDelivery(!delivery);
        setPickUp(false);
        setPickUpOrDelivery('DELIVERY');

    };

    const handleAdoption = async (event) => {
        event.preventDefault();
            try {
                const response = await fetch(`http://localhost:9453/adoption/adoptcat/${encodeURIComponent(identifier)}/${encodeURIComponent(catId)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ identifier, catId, adoptDate, name, email, phoneNumber, pickUpOrDelivery, deliveryAddress }),
                });

                if (response.status === 201) {
                    setSuccess(true);
                    setTimeout(() => {
                         setSuccess(false);
                     }, 3000);
                } else {
                    setFailed(true);
                    setTimeout(() => {
                         setFailed(false);
                     }, 3000);
                }
            } catch (error) {
                alert(error);
            }
        
    };


  return (
    <div className="homepage-container">
        {toastSuccess && (
    <Toast className='toast-bgadopt'>
        <div>
            <HiCheck className='success-toastadopt' />
        </div>
        <div className='toast-textadopt'>Adopt Success!</div>
        <Toast.Toggle className='toast-closeadopt'/>
    </Toast>)}

{toastFailed && (
    <Toast className='toast-bg'>
        <div>
            <HiX className='failed-toastadopt' />
        </div>
        <div className='toast-textadopt'>Adopt Failed! Cat Has Been Adopted</div>
        <Toast.Toggle className='toast-closeadopt'/>
    </Toast>
)}



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
        <Link to={`/profilePage/${identifier}`} className='notactiverl'>PROFILE</Link>
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
        <button className="homepage-frame00-button" onClick={handleAdoption}>
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
          onChange={(event) => setName(event.target.value)}
        value = {name}
        />
        <div
          className="homepage-frame01-input-field1">
            {catDetail ? catDetail.cat_name : "" }
            </div>

        <div
          className="homepage-frame01-input-field2">
             {catDetail ? catDetail.gender : "" }
            </div>
        
        <div
          className="homepage-frame01-input-field3">
             {catDetail ? catDetail.race : "" }
          </div>
        
        <input
          type="text"
          placeholder="E-Mail"
          className="homepage-frame01-input-field4"
          onChange={(event) => setEmail(event.target.value)}
        value = {email}
        />
        <input
          type="text"
          placeholder="Phone number"
          className="homepage-frame01-input-field5"
          onChange={(event) => setPhoneNumber(event.target.value)}
        value = {phoneNumber}
        />

        {delivery ? 
 <input
 type="text"
 placeholder="Enter your address"
 className="homepage-frame01-input-field6"
 onChange={(event) => setdDeliveryAddress(event.target.value)}
        value = {deliveryAddress}
/>
        :
        <div className="homepage-frame01-input-field6"> Pick Up At Our Shelter</div>
      
        }
        <span className="homepage-text28">
          <span>Address</span>
        </span>
        <span className="homepage-text30">
          <span>Pick Up/Delivery</span>
        </span>
       
       
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