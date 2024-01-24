import React from 'react'
import DashBoard from '../components/DashBoard.jsx'
import PatientSideMenu from '../components/PatientSideMenu.jsx'
import PatientHistoryTable from './PatientHistoryTable.jsx'

function PatientHistoryPage() {
  return (
    <div>
        <DashBoard />
            <section className='flex items-start'>
                <PatientSideMenu />
                <PatientHistoryTable/>
            </section>
      
    </div>
  )
}

export default PatientHistoryPage
