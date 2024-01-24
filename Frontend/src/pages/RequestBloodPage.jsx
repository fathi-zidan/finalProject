import React from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DashBoard from '../components/DashBoard.jsx'
import PatientSideMenu from '../components/PatientSideMenu.jsx'
import BloodRequestForm from '../components/donorCards/BloodRequestForm'

function RequestBloodPage() {
  return (
    <div>
    <DashBoard />
        <section className='flex items-center'>
            <PatientSideMenu/>
            <div className='ml-[300px] '>
            <BloodRequestForm/>
            </div>
            
        </section>
</div>
  )
}

export default RequestBloodPage
