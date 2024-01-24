import React from 'react'
import { MdPendingActions } from "react-icons/md";

function DonorTotalRequestMade({totalRequest}) {
  return (
    <section className='bg-white shadow-xl p-5 rounded-lg  w-full max-w-[235px] mx-auto
    cursor-pointer hover:shadow-2xl transition mt-4'>

    <div className='flex flex-col items-start justify-start '>
        <div className='flex items-center justify-center  ml-[180px]'>
            <MdPendingActions size={32} color="blue" />
        </div>
        <h2 className='font-bold text-[18px]'>Total Requests Made</h2>
        <h2 className='font-bold text-[18px]'>{totalRequest}</h2>
    </div>
    </section>
  )
}

export default DonorTotalRequestMade
