import React from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DonorTable from '../components/DonorTable.jsx'
import DashBoard from '../components/DashBoard.jsx'
import DonorSideMenu from '../components/DonorSideMenu.jsx'
import DonorHistoryTable from '../components/DonorHistoryTable.jsx'

function DonorHistoryPage() {
  return (
    <div>
         <DashBoard />
            <section className='flex items-start'>
                <DonorSideMenu />
                <DonorHistoryTable/>
            </section>
      
    </div>
  )
}

export default DonorHistoryPage
