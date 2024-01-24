import React, { useEffect } from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DonorTable from '../components/DonorTable.jsx'
import DashBoard from '../components/DashBoard.jsx'
import DonationRequests from '../components/DonationRequests.jsx'
import BloodRequests from '../components/BloodRequests.jsx'
import { useUpdateContext } from '../context/UpdateContext.jsx'
import { useDataContext } from '../context/DataContext.jsx'

function BloodRequestPage() {
  // const {fetchPatients } = useDataContext();
  // useEffect(async () =>{
  //   const fetchData = async () => {
  //     await fetchPatients();
  //   };

  //   fetchData();
  // },[])
  
 
  return (
    <div>
        <DashBoard />
            <section className='flex items-start'>
                <HospitalSideMenu />
               <BloodRequests/>
            </section>
      
    </div>
  )
}

export default BloodRequestPage
