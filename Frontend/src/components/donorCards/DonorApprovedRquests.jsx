import React from 'react'
import { VscVerifiedFilled } from "react-icons/vsc"

function DonorApprovedRquests({totalBloodRequestsApproved}) {
  return (
    <section className='bg-white shadow-xl p-5 rounded-lg  w-full max-w-[235px] mx-auto
    cursor-pointer hover:shadow-2xl transition mt-4'>

    <div className='flex flex-col items-start justify-start '>
        <div className='flex items-center justify-center  ml-[180px]'>
            <VscVerifiedFilled size={32} color="blue" />
        </div>
        <h2 className='font-bold text-[18px]'>Total Approved Requests</h2>
        <h2 className='font-bold text-[18px]'>{totalBloodRequestsApproved}</h2>
    </div>
    </section>
  )
}

export default DonorApprovedRquests
