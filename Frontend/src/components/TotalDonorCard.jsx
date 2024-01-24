import React from 'react'
import { IoPeopleSharp, IoWaterSharp } from "react-icons/io5";


function TotalDonorCard({ totalDonors}) {
  return (
    <section className='bg-white shadow-xl p-5 rounded-lg  w-full max-w-[235px] mx-auto
    cursor-pointer hover:shadow-2xl transition mt-4'>

    <div className='flex flex-col items-start justify-start '>
        <div className='flex items-center justify-center  ml-[180px]'>
            <IoPeopleSharp size={32} color="blue" />
        </div>
        <h2 className='font-bold text-[18px]'>Total Donors</h2>
        <h2 className='font-bold text-[18px]'>{ totalDonors}</h2>
    </div>
    </section>
  )
}

export default TotalDonorCard
