import React from 'react'
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function FullDashBoard() {
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
</div>
  )
}

export default FullDashBoard
