import React from 'react'
import DonorSideMenu from '../components/DonorSideMenu'
import DashBoard from '../components/DashBoard'
import DonorTotalRequestMade from '../components/donorCards/DonorTotalRequestMade'
import { useDataContext } from '../context/DataContext'
import DonorApprovedRquests from '../components/donorCards/DonorApprovedRquests'
import DonorRejectedRequest from '../components/donorCards/DonorRejectedRequest'
import DonorPendingRequest from '../components/donorCards/DonorPendingRequest'

function DonorHomePage() {
    const {donorTotals} =useDataContext();
  return (
   <div>
            <DashBoard />
            <section className='flex items-start'>
                <DonorSideMenu/>
                <section className='flex flex-col '>
                    <div className=' ml-12 flex items-center justify-start gap-x-5 mx-auto  max-w-[1000px]'>
                        <DonorTotalRequestMade totalRequest = {donorTotals.totalBloodRequestsMade} />
                        <DonorApprovedRquests totalBloodRequestsApproved= {donorTotals.totalBloodRequestsApproved}/>
                        <DonorRejectedRequest totalBloodRequestsRejected= {donorTotals.totalBloodRequestsRejected}/>
                        <DonorPendingRequest totalBloodRequestsPending={donorTotals.totalBloodRequestsPending}/>
                    </div>
                </section>

            </section>
        </div>
  )
}

export default DonorHomePage
