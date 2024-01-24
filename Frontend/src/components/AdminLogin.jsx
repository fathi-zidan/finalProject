import React,{useContext,useState,useRef} from 'react'
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import FullDashBoard from '../components/FullDashBoard.jsx'
import { useLogInContext } from '../context/AuthContext.jsx';

function AdminLogin() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const { AdminLogIn} = useLogInContext();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            username :userNameRef.current.value,
            password : passwordRef.current.value
        }
        await AdminLogIn(user)
    };
    return (
        <section className='flex flex-col items-center justify-center '>
            <div className='w-full'>
            <FullDashBoard/>
            </div>
           
        <section className='flex flex-col items-center justify-start bg-white w-[500px] h-[400px] rounded-lg shadow-xl mt-[30px]'>
        <div className='bg-formBlack flex items-center justify-center w-full h-[50px] text-white text-center rounded-tr-lg rounded-tl-lg'>
                <h1 className='font-bold'>Admin Login</h1>
            </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-20 ">
            
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Username
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                        type="text"
                       ref={userNameRef}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Password
                    </label>
                </div>
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
        </form>
        </section>
        </section>
    )
}

export default AdminLogin

