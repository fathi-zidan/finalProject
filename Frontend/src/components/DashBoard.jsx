import React from 'react'
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";

function DashBoard() {
    return (
        <div>
            <section className='flex item-center justify-between w-full h-[55px] bg-red-600 text-white'>

                <div className='flex items-center gap-x-2'>
                    <div className='pl-2'><FaHeartbeat /> </div>
                    <h2 className='font-bold'>Blood Bank Management</h2>
                </div>

                <div className='flex items-center gap-x-3 pr-3'>
                    <div className='flex items-center gap-x-1 hover:font-bold'>
                        < MdLogout />
                        <Link to='/logout'>Logout</Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default DashBoard
