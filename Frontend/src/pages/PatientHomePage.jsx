import React from 'react'
import DonorSideMenu from '../components/DonorSideMenu'
import DashBoard from '../components/DashBoard'
import DonorTotalRequestMade from '../components/donorCards/DonorTotalRequestMade'
import { useDataContext } from '../context/DataContext'
import DonorApprovedRquests from '../components/donorCards/DonorApprovedRquests'
import DonorRejectedRequest from '../components/donorCards/DonorRejectedRequest'
import DonorPendingRequest from '../components/donorCards/DonorPendingRequest'
import PatientSideMenu from '../components/PatientSideMenu'
function PatientHomePage() {
  const {patientTotals} = useDataContext();
  console.log(patientTotals)
  return (
    <div>
    <DashBoard />
    <section className='flex items-start'>
        <PatientSideMenu/>
        <section className='flex flex-col '>
            <div className=' ml-12 flex items-center justify-start gap-x-5 mx-auto  max-w-[1000px]'>
                <DonorTotalRequestMade totalRequest = {patientTotals.totalBloodRequestsMade} />
                <DonorApprovedRquests totalBloodRequestsApproved= {patientTotals.totalBloodRequestsApproved}/>
                <DonorRejectedRequest totalBloodRequestsRejected= {patientTotals.totalBloodRequestsRejected}/>
                <DonorPendingRequest totalBloodRequestsPending={patientTotals.totalBloodRequestsPending}/>
            </div>
        </section>

    </section>
</div>
  )
}

export default PatientHomePage
