import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import FullDashBoard from '../components/FullDashBoard.jsx';
import { useLogInContext } from '../context/AuthContext.jsx';
import axios from 'axios'

function DonationForm() {
    const unitRef = useRef();
    const diseasesRef = useRef();
    const ageRef = useRef();
    const [bloodType, setBloodType] = useState('');
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDonor = localStorage.getItem("donor");
            const parsedDonor = JSON.parse(currentDonor);
            console.log("Parsed Donor:", parsedDonor);
            // const donorId = parsedDonor.donor._id;
            // console.log('Donor ID:', donorId);

            const bloodDonation = {
                donorId: parsedDonor.donor._id,
                bloodType: bloodType,
                bloodUnits: unitRef.current.value,
                diseases: diseasesRef.current.value
            };
            console.log("Blood Donation Data:", bloodDonation);
            const response = await axios.post('https://blood-bank-j5i9.onrender.com/donors/donateBlood', bloodDonation);
            console.log(response.data)
            console.log("Response from Server:", response.data);
            navigate('/donor/donationHistory')

        } catch (error) {
            console.log(error.response);

        }

    };
    return (
        <section className='flex flex-col items-center justify-center '>
            <section className='flex flex-col items-center justify-start bg-white w-[500px] h-[400px] rounded-lg shadow-xl mt-[30px]'>
                <div className='bg-formBlack flex items-center justify-center w-full h-[50px] text-white text-center rounded-tr-lg rounded-tl-lg'>
                    <h1 className='font-bold'>DONATE BLOOD </h1>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mt-10">

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-1/3  block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Blood Type
                        </label>
                        <div className="md:w-2/3">
                            <select
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                onChange={(e) => setBloodType(e.target.value)}
                            >
                                <option value="">Select Blood Type</option>
                                {bloodTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Unit(in ml)
                        </label>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="number"
                                ref={unitRef}
                            />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Diseases
                        </label>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text" defaultValue='Nothing'
                                ref={diseasesRef}
                            />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Age
                        </label>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="number"
                                ref={ageRef}
                            />
                        </div>
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button
                                className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default DonationForm
