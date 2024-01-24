import React from 'react'
import HospitalSideMenu from '../components/HospitalSideMenu.jsx'
import DashBoard from '../components/DashBoard';
import BloodCard from '../components/BloodCard.jsx';
import TotalDonorCard from '../components/TotalDonorCard.jsx';
import TotalRequestsCard from '../components/TotalRequestsCard.jsx';
import ApprovedRequestCard from '../components/ApprovedRequestCard.jsx';
import TotalBloodCard from '../components/TotalBloodCard.jsx';
import { useDataContext } from '../context/DataContext.jsx';

function HospitalPage() {
    const {bloodStock,totals} = useDataContext();
    return (
        <div>
            <DashBoard />
            <section className='flex items-start'>
                <HospitalSideMenu />
                <section className='flex flex-col '>


                    <div className='container ml-12 mx-auto max-w-[1000px]'>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-14'>
                           {bloodStock.map((item)=>(
                            <BloodCard key={item.id} item={item}/>
                           )

                           )}
                        </div>

                        <div className=' mt-6 border-t-2 border-sideMenuTextColor w-full'>

                        </div>

                    </div>

                    <div className=' ml-12 flex items-center justify-start gap-x-5 mx-auto  max-w-[1000px]'>
                        <TotalDonorCard totalDonors = {totals.totalDonors} />
                        <TotalRequestsCard TotalRequestsCard = {totals.totalBloodRequests}/>
                        <ApprovedRequestCard totalApprovedRequests = {totals.totalApprovedRequests}/>
                        <TotalBloodCard totalUnitsOfBlood={totals.totalUnitsOfBlood}/>
                    </div>
                </section>

            </section>
        </div>
    )
}

export default HospitalPage
