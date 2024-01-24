import React from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DonorTable from '../components/DonorTable.jsx'
import DashBoard from '../components/DashBoard.jsx'

function PatientPage() {
  return (
    <div>
         <DashBoard />
            <section className='flex items-start'>
                <HospitalSideMenu />
                <DonorTable userType='patient'/>
            </section>
      

    </div>
  )
}

export default PatientPage
