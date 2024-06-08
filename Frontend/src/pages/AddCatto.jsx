import React, { useState, useEffect } from 'react';

const AddCatto = () => {
    return (
        <div className="bg-secondary p-4">
            <div>
                <h1 className="text-[20pt] font-bold mb-4 ">Add Catto</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Name:</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded-md w-full text-[15pt]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Date of Birth:</label>
                    <input
                        type="date"
                        className="border border-gray-300 px-4 py-2 rounded-md w-full text-[15pt]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-[15pt]">Gender:</label>
                    <select
                        className="border border-gray-300 px-4 py-2 rounded-md w-full text-[15pt]"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button className="bg-primary text-black font-bold text-[15pt] px-4 py-2 rounded-md hover:scale-[102%] transition-all">
                    Add Catto
                </button>
            </div>
        </div>
    );
};

export default AddCatto;