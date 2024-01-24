import React, { useState } from 'react';
import axios from 'axios';
import { useDataContext } from '../context/DataContext';
import { useUpdateContext } from '../context/UpdateContext';

function BloodRequests() {
  const { patients,fetchPatients } = useDataContext();
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('');  
  const handleApprove = async (patientId, requestId) => {
    try {
      await axios.put('http://localhost:3000/Admin/bloodRequestApproval', {
        requestId,
        patientId,
        approvalStatus: 'Approved'
      });
        
      setModalMessage(`${patients.find(patient => patient._id === patientId).name}'s donation request approved.`);
      setShowModal(true);

      setTimeout(async() => {
        setShowModal(false);
        setModalMessage('');
        await fetchPatients();
      }, 6000);
    } catch (error) {
      console.error('Error approving blood request:', error);
      setModalMessage(error.response.data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setModalMessage('');
      }, 7000);
    }
  };

  const handleReject = async (patientId, requestId) => {
    try {
      await axios.put('http://localhost:3000/Admin/bloodRequestApproval', {
        requestId,
        patientId,
        approvalStatus: 'Rejected'
      });
   
      setModalMessage(`${patients.find(patient => patient._id === patientId).name}'s donation request Rejected.`);
      setShowModal(true);

      setTimeout(async() => {
        setShowModal(false);
        setModalMessage('');
        await fetchPatients();
      }, 6000);
    } catch (error) {
      console.error('Error rejecting blood request:', error);
      setModalMessage(error.response.data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setModalMessage('');
      }, 7000);
    }
  };

  return (
    <div className="w-[100%]">
      <table className="w-full overflow-x-auto table-fixed border-collapse shadow-md rounded-lg whitespace-nowrap mx-auto max-w-[95%]">
        <thead className="bg-gray-300 text-gray-800">
          <tr>
            <th className="p-4">Patient Name</th>
            <th className="p-4">Diseases</th>
            <th className="p-4">Blood Group</th>
            <th className="p-4">Age</th>
            <th className="p-4">Requested Units</th>
            <th className="p-4">Request Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through patients and their blood request history */}
          {patients.map((patient) => (
            patient.bloodRequestHistory.map((request) => (
              request.status === 'Pending' &&
              <tr key={request._id} className="hover:bg-gray-200">
                <td className="text-center p-4">{patient.name}</td>
                <td className="text-center flex justify-center p-4">
                  {patient.diseases.length > 0 ? patient.diseases.join(', ') : 'Nothing'}
                </td>
                <td className="text-center p-4">{patient.bloodType}</td>
                <td className="text-center p-4">{patient.age}</td>
                <td className="text-center p-4">{request.quantity}</td>
                <td className="text-center p-4">{request.donationDate.split('T')[0]}</td>
                <td className="text-center p-4">{request.status}</td>
                <td className="flex items-center justify-center gap-x-1 p-4">
                  {request.status === 'Pending' && (
                    <>
                      <button
                        className='flex items-start justify-center p-2 rounded-xl bg-blue-600 text-white'
                        onClick={() => handleApprove(patient._id, request._id)}
                      >
                        Approve
                      </button>
                      <button
                        className='flex items-start justify-center p-1 rounded-xl bg-red-600 text-white'
                        onClick={() => handleReject(patient._id, request._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center shadow-xl">
                      <div className={`flex flex-col items-center justify-center gap-y-2 bg-white p-4 rounded shadow-xl`}>
                        <p className='font-bold'>
                          {modalMessage}
                        </p>
                        <div>
                          <button className='flex items-center justify-center p-2 w-[70px] 
                      rounded-md bg-red-600 font-bold text-white' onClick={() => setShowModal(false)}>Ok</button>
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

export default BloodRequests;
