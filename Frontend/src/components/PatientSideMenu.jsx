import React from 'react'
import { IoMdWater } from "react-icons/io";
import { FaHeartbeat, FaHospital, FaHome, FaBed } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import DashBoard from '../components/DashBoard';
import { Link } from 'react-router-dom';

function PatientSideMenu() {
  return (
    <section className='flex flex-col items-start justify-start
    bg-sideMenuColor text-sideMenuTextColor w-[180px] h-[90vh] pt-2 '>

            <div className='flex items-center gap-x-1
    border-sideMenuTextColor border-t-2 pl-2 w-full h-[40px] hover:font-bold  
    hover:text-white hover:border-white mt-4'>
                <FaHome />
                <Link to='/patient/home'>Home</Link>
            </div>

            <div className='flex items-center gap-x-1
    border-sideMenuTextColor border-t-2 pl-2 w-full h-[40px] hover:font-bold hover:text-white
    hover:border-white mt-4'>
                <FaHandHoldingMedical/>
                <Link to='/patient/requestBlood'>Request Blood </Link>
            </div>

            <div className='flex items-center gap-x-1
    border-sideMenuTextColor border-t-2 pl-2 w-full h-[40px] hover:font-bold hover:text-white
    hover:border-white mt-4'>
                <FaHistory />
                <Link to='/patient/bloodRequestHistory'>Request History</Link>
            </div>

        

        </section>
  )
}

export default PatientSideMenu
