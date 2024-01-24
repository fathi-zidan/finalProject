import React, { useState } from 'react';
import { useDataContext } from '../context/DataContext';
import axios from 'axios';
import chalk from 'chalk'
import { useUpdateContext } from '../context/UpdateContext';

function DonationRequests() {
  const { donors,fetchDonors } = useDataContext();
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('');
  
  const handleApprove = async (donorId, requestId) => {
    try {
      await axios.put('http://localhost:3000/Admin/approval', {
        requestId,
        donorId,
        approvalStatus: 'Approved'
      });
      //  refetch the donors context to update the state 
      
      setModalMessage(`${donors.find(donor => donor._id === donorId).name}'s donation request approved.`);
      setShowModal(true);

      setTimeout(async() => {
        setShowModal(false);
        setModalMessage('');
        await fetchDonors();
      }, 6000);
    }
    catch (error) {
      console.error('Error approving donation request:', error);
      setModalMessage(error.response.data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setModalMessage('');
      }, 6000);
    }
  };

  const handleReject = async (donorId, requestId) => {
    try {
      await axios.put('http://localhost:3000/Admin/approval', {
        requestId,
        donorId,
        approvalStatus: 'Rejected'
      });
  
      setModalMessage(`${donors.find(donor => donor._id === donorId).name}'s donation request Rejected.`);
      setShowModal(true);

      setTimeout(async() => {
        setShowModal(false);
        setModalMessage('');
        await fetchDonors();
      }, 6000);

    } catch (error) {
      console.error('Error rejecting donation request:', error);
      setModalMessage(error.response.data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setModalMessage('');
      }, 6000);
    }
  };

  return (
    <div className="w-[100%]">
      <table className="w-full overflow-x-auto table-fixed border-collapse shadow-md rounded-lg whitespace-nowrap mx-auto max-w-[97%]">
        <thead className="bg-gray-300 text-gray-800">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Diseases</th>
            <th className="p-4">Blood Group</th>
            <th className="p-4">Age</th>
            <th className="p-4">Unit</th>
            <th className="p-4">Request Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            donor.donationHistory.map((donation) => (
              donation.status === 'Pending' &&
              <tr key={donation._id} className="hover:bg-gray-200">
                <td className="text-center p-4">{donor.name}</td>
                <td className="text-center flex flex-grow-5 justify-center p-4">
                  {donor.diseases.length > 0 ? donor.diseases.join(', ') : 'Nothing'}
                </td>
                <td className="text-center p-4">{donor.bloodType}</td>
                <td className="text-center p-4">{donor.age}</td>
                <td className="text-center p-4">{donation.bloodUnits}</td>
                <td className="text-center p-4">{donation.donationDate.split('T')[0]}</td>
                <td className="text-center p-4">{donation.status}</td>
                <td className=" flex items-center justify-center gap-x-1 text-center p-4">

                  {donation.status === 'Pending' && (
                    <>
                      <button
                        className="flex items-start justify-center p-2 rounded-xl bg-blue-600 text-white"
                        onClick={() => handleApprove(donor._id, donation._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="flex items-start justify-center p-1 rounded-xl bg-red-600 text-white"
                        onClick={() => handleReject(donor._id, donation._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {donation.status === 'Approved' && (
                    <span className="text-green-600">
                      {`${donation.bloodUnits}units added to stock`}
                    </span>
                  )}
                  {showModal && (
                     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center shadow-xl">
                     <div className={ `flex flex-col items-center justify-center gap-y-2 bg-white p-4 rounded shadow-xl`}>
                       <p className='font-bold'>
                         {modalMessage}
                       </p>
                       <div>
                      <button type='submit' className='flex items-center justify-center p-2 w-[70px] 
                      rounded-md bg-red-600 font-bold text-white' onClick={()=>setShowModal(false)}>Ok</button>
                     </div>
                     </div>
                   </div>
                  )}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationRequests;
