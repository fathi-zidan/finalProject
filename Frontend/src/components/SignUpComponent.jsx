import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import FullDashBoard from '../components/FullDashBoard.jsx';
import { useLogInContext } from '../context/AuthContext.jsx';

function SignUpComponent({ userType }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const ageRef = useRef();
    const diseasesRef = useRef();
    const bloodTypeRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const profilePicRef = useRef();
    const [bloodType, setBloodType] = useState(''); // State for blood type dropdown
    const { createDonor,createPatient } = useLogInContext();
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            age: ageRef.current.value,
            diseases: diseasesRef.current.value.split(','),
            bloodType,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            profilePic: profilePicRef.current.value,
        };

        if (userType === 'donor') {
            await createDonor(user);
        } else if (userType === 'patient') {
            await createPatient(user);
        }
    };

    return (
        <section className='flex flex-col items-center justify-start h-full'>
            <div className='w-full fixed'>
                <FullDashBoard />
            </div>

            <section className='flex flex-col items-center justify-start w-[450px] h-auto rounded-lg shadow-xl mt-[60px] '>
                <div className='bg-formBlack flex items-center justify-center w-full h-[50px] text-white text-center rounded-tr-lg rounded-tl-lg'>
                    <h1 className='font-bold'>{userType === 'donor' ? 'Donor' : 'Patient'} SignUp</h1>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mt-10">

                    <section className='flex items-start justify-center gap-x-2'>
                   
                    <div className="md:flex  md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Name
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={nameRef}
                                placeholder='Enter name'
                            />
                        </div>
                    </div>
                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Age
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="number"
                                ref={ageRef}
                                placeholder='Enter Age'
                            />
                        </div>
                    </div>
                    </section>
                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Email
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={emailRef}
                                placeholder='example@email.com'
                            />
                        </div>
                    </div>

                    <section className='flex items-start justify-center gap-x-2'>
                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Diseases
                        </label>
                        <div className="md:w-full">
                            <input placeholder='comma-separated'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={diseasesRef}
                            />
                        </div>
                    </div>

                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-full block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Blood Type
                        </label>
                        <div className="md:w-full">
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
                    </section>

                    <section className='flex items-start justify-center gap-x-2'>
                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Phone
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={phoneRef}
                                placeholder='Enter Phone number'
                            />
                        </div>
                    </div>

                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Address
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={addressRef}
                                placeholder='Enter Address'
                            />
                        </div>
                    </div>
                    </section>

                    <section className='flex items-start justify-center gap-x-2'>
                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-full block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Profile Picture URL
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={profilePicRef}
                                placeholder='Optional - Enter a Image URL'
                            />
                        </div>
                    </div>
                    <div className="md:flex md:flex-col md:items-center md:justify-center mb-3">
                        <label className="md:w-full block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                            Password
                        </label>
                        <div className="md:w-full">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="password"
                                ref={passwordRef}
                                placeholder='Enter Password'
                            />
                        </div>
                    </div>
                    </section>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button
                                className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className='mt-3'>
                        you have an Account ? <Link to={`/${userType}/login`} className='text-blue-500 hover:text-blue-900'>click here to Login</Link>
                    </div>
                </form>
            </section>
        </section>
      
    );

}

export default SignUpComponent
