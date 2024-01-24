import React from 'react'
import FullDashBoard from '../components/FullDashBoard.jsx';

function LogoutPage() {
    return (
        <div>
            <FullDashBoard/>
            <section className=' flex items-center justify-center w-full mt-5'>
                <img className='' src="https://github.com/sumitkumar1503/bloodbankmanagement/blob/master/static/image/logout.png?raw=true" alt="logoutPic" />
            </section>
            <section className='flex items-center justify-center mt-4'>
                <h1 className='font-bold text-xl'>You Have Been Logged Out</h1>

            </section>
            <section className='bg-gray-200 flex items-center justify-center h-[100px] mt-[105px]'>
                <h2 className='text-gray-500 font-medium'>"Be a lifeline in your community,donate blood, save lives"</h2>
            </section>


        </div>
    )
}

export default LogoutPage
