import React from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DonorTable from '../components/DonorTable.jsx'
import DashBoard from '../components/DashBoard.jsx'

function DonorPage() {
  return (
    <div>
         <DashBoard />
            <section className='flex items-start'>
                <HospitalSideMenu />
                <DonorTable userType='donor'/>
            </section>
      
    </div>
  )
}

export default DonorPage
