import React from 'react'
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <section className='flex item-center justify-between w-full h-[55px] bg-red-600 text-white'>

                <div className='flex items-center gap-x-2'>
                    <div className='pl-2'><FaHeartbeat /> </div>
                    <h2 className='font-bold'>Blood Bank Management</h2>
                </div>

                <div className='flex items-center gap-x-3 pr-3'>
                    <div className='flex items-center gap-x-1 hover:font-bold'>
                        <FaHome />
                        <Link to='/'>Home</Link>
                    </div>

                    <div className='flex items-center gap-x-1 hover:font-bold'>
                        <FaBed />
                        <Link to='/patient/login'>Patient</Link>
                    </div>

                    <div className='flex items-center gap-x-1 hover:font-bold'>
                        <FaPerson />
                        <Link to='/donor/login'>Donor</Link>
                    </div>

                    <div className='flex items-center gap-x-1 hover:font-bold'>
                        <FaHospital />
                        <Link to='/Admin/login'>Hospital</Link>
                    </div>
                </div>
            </section>
            <section className='w-full'>
                <img className='w-full' src="https://github.com/sumitkumar1503/bloodbankmanagement/blob/master/static/image/homepage.jpg?raw=true" alt="homePic" />
            </section>
            <section className='bg-gray-200 flex items-center justify-center h-[100px]'>
                <h2 className='text-gray-500 font-medium'>"Be a lifeline in your community,donate blood, save lives"</h2>
            </section>

        </div>
    )
}

export default HomePage
