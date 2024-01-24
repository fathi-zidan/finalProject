import React, { useEffect } from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DonorTable from '../components/DonorTable.jsx'
import DashBoard from '../components/DashBoard.jsx'
import DonationRequests from '../components/DonationRequests.jsx'
import { useUpdateContext } from '../context/UpdateContext.jsx'
import { useDataContext } from '../context/DataContext.jsx'

function DonationsPage() {
  // const {fetchDonors} = useDataContext();
  // useEffect(async()=>{
   
  //   const fetchData = async () => {
  //     await fetchDonors();
  //   };

  //   fetchData();

  // },[])
  
  return (
    <div>
          <DashBoard />
            <section className='flex items-start'>
                <HospitalSideMenu />
                <DonationRequests/>
            </section>
      
    </div>
  )
}

export default DonationsPage
