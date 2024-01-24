import React from 'react'
import { GrDocumentMissing } from "react-icons/gr";

function DonorRejectedRequest({totalBloodRequestsRejected}) {
  return (
    <section className='bg-white shadow-xl p-5 rounded-lg  w-full max-w-[235px] mx-auto
    cursor-pointer hover:shadow-2xl transition mt-4'>

    <div className='flex flex-col items-start justify-start '>
        <div className='flex items-center justify-center  ml-[180px]'>
            <GrDocumentMissing size={32} color="blue" />
        </div>
        <h2 className='font-bold text-[18px]'>Total Rejected Requests</h2>
        <h2 className='font-bold text-[18px]'>{totalBloodRequestsRejected}</h2>
    </div>
    </section>
  )
}

export default DonorRejectedRequest
