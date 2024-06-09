import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useParams } from 'react-router-dom';

const AddCatt = () => {
    const { identifier } = useParams();
    const [catName] = useState("");
    const [catDescription] = useState("");
    const [catImage, setCatImage] = useState("");
    const [gender] = useState("");
    const [birthDate] = useState("");
    const [race] = useState("");

    console.log(identifier);
    useEffect(() => {
        const getDetails = async () => {
          try {
            const response = await fetch(`http://localhost:9453/users/info/${encodeURIComponent(identifier)}`);
            if (response.status === 200) {
              const data = await response.json();
              setUserDetail(data.data);
            } else if (response.status === 404) {
              alert("Account not found");
            } else {
              alert("Failed to get user details");
            }
          } catch (error) {
            console.error(error);
            alert("Failed to get user details");
          }
        };
    
        getDetails();
      }, [identifier]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await Axios.post('http://localhost:9453/cats/addcat', {
                cat_name: catName,
                description: catDescription,
                cat_picture: catImage,
                gender: gender,
                birthDate: birthDate,
                race: race,
                userId: identifier,
            });
            console.log('Cat added successfully:', response.data);
        } catch (error) {
            console.error('Error adding cat:', error);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "bugtucs0");
        formData.append("folder", "profile_picture_user");

        try {
            const response = await Axios.post(
                "https://api.cloudinary.com/v1_1/dramhnsj2/image/upload",
                formData
            );
            setCatImage(response.data.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="bg-secondary p-4 font-josefin_sans flex flex-row justify-center items-center w-screen h-screen">
            <div className='bg-primary justify-between flex flex-col p-2 rounded-md w-[450px]'>
                <h1 className="text-[20pt] font-bold mb-4 text-center">Add Your Cat</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Name:</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-2 py-2 rounded-md w-full text-[15pt]"
                        value={catName}
                    />
                </div>
                <div className="imageborder">
                    <label className="block mb-2 text-[15pt]">Image:</label>
                    <input
                        type="file"
                        className="border border-gray-300 px-2 py-2 rounded-md w-full text-[15pt]"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Date of Birth:</label>
                    <input
                        type="date"
                        className="border border-gray-300 px-2 py-2 rounded-md w-full text-[15pt]"
                        value={birthDate}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Gender:</label>
                    <select
                        className="border border-gray-300 px-2 py-2 rounded-md w-full text-[15pt]"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Race:</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-2 py-2 rounded-md w-full text-[15pt]"
                        value={race}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Description:</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-2 py-2 rounded-md w-full text-[15pt]"
                        value={catDescription}
                    />
                </div>
                <button className="bg-fourth text-black font-bold text-[15pt] px-2 py-2 rounded-md hover:scale-[102%] transition-all">
                    Add Catto
                </button>
            </div>
        </div>
    );
};

export default AddCatt;