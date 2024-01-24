import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import FullDashBoard from '../components/FullDashBoard.jsx';
import { useLogInContext } from '../context/AuthContext.jsx';

function LoginComponent({ userType }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { DonorLogIn, PatientLogIn } = useLogInContext();
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            if (userType === 'donor') {
                await DonorLogIn(user);
            } else if (userType === 'patient') {
                await PatientLogIn(user);
            }
        } catch (error) {
            console.log("Error in login", error);
            setModalMessage('Invalid credentials. Please try again.');
            setShowModal(true);
        }


    };

    return (
        <section className='flex flex-col items-center justify-center '>
            <div className='w-full'>
                <FullDashBoard />
            </div>

            <section className='flex flex-col items-center justify-start bg-white w-[500px] h-[400px] rounded-lg shadow-xl mt-[30px]'>
                <div className='bg-formBlack flex items-center justify-center w-full h-[50px] text-white text-center rounded-tr-lg rounded-tl-lg'>
                    <h1 className='font-bold'>{userType === 'donor' ? 'Donor' : 'Patient'} Login</h1>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mt-20">

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Email
                        </label>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="text"
                                ref={emailRef}
                            />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Password
                        </label>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                type="password"
                                ref={passwordRef}
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
                                Login
                            </button>
                        </div>
                    </div>

                    <div className='mt-3'>
                        Does not have an Account ? <Link to={`/${userType}/signUp`} className='text-blue-500 hover:text-blue-900'>click here to register</Link>
                    </div>
                   
                </form>
                {showModal && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center shadow-xl">
                            <div className={`flex flex-col items-center justify-center gap-y-2 bg-white p-4 rounded shadow-xl`}>
                                <p className='font-bold'>
                                    {modalMessage}
                                </p>
                                <div>
                                    <button className='flex items-center justify-center p-2 w-[70px] 
                      rounded-md bg-red-600 font-bold text-white' onClick={() => setShowModal(false)}>Ok</button>
                                </div>
                            </div>
                        </div>
                    )}
            </section>
        </section>
    );
}

export default LoginComponent;
