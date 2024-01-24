import React from 'react';
import { IoWaterSharp } from 'react-icons/io5';

function BloodCard({ item }) {
  const { bloodType, units } = item;
  return (
    <section className='bg-white shadow-xl p-5 rounded-lg w-full max-w-[250px] mx-auto cursor-pointer hover:shadow-2xl transition mt-4'>
      <div className='flex flex-col items-start justify-start '>
        <div className='flex items-center justify-center ml-[98px]'>
          <h1 className='font-extrabold text-[30px]'>{bloodType}</h1>
          <IoWaterSharp size={30} color='red' />
        </div>
        <h2 className='font-bold text-[18px]'>{units}</h2>
      </div>
    </section>
  );
}

export default BloodCard;
