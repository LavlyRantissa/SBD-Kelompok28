import React, { useState, useEffect } from 'react';
import Axios from "axios";

const AddCatt = () => {
    const [catName, setCatName] = useState("");
    const [catDescription, setDescription] = useState("");
    const [catImage, setCatImage] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [race, setRace] = useState("");
    const [idUser, setIdUser] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await Axios.get(`http://localhost:9453/users/info/${encodeURIComponent(identifier)}`);
                setIdUser(response.data.data.id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

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
                userId: idUser,
            });
            console.log('Cat added successfully:', response.data);
        } catch (error) {
            console.error('Error adding cat:', error);
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