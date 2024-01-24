import React from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DashBoard from '../components/DashBoard.jsx'
import DonorSideMenu from '../components/DonorSideMenu.jsx'
import DonationForm from '../components/DonationForm.jsx'

function DonateBloodPage() {
  return (
    <div>
        <DashBoard />
            <section className='flex items-center'>
                <DonorSideMenu />
                <div className='ml-[300px] '>
                <DonationForm/>
                </div>
                
            </section>
    </div>
  )
}

export default DonateBloodPage
