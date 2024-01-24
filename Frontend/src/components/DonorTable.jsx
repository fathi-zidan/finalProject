import React, { useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { useDataContext } from '../context/DataContext.jsx';
import DonorEditModal from './DonorEditModal.jsx';
import axios from 'axios';

function DonorTable({ userType }) {
  const { donors, patients, UpdatePatient, UpdateDonor, fetchDonors, fetchPatients } = useDataContext();
  const data = userType === 'donor' ? donors : patients;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleDeleteClick = async (userId) => {
    try {
      if (userType === 'donor') {
        await axios.delete(`http://localhost:3000/donors/donor/${userId}`);
        fetchDonors();
      } else {
        await axios.delete(`http://localhost:3000/patients/Patient/${userId}`);
        fetchPatients();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleSaveUser = async (updatedUserData) => {
    try {
      console.log('Selected User:', selectedUser);
      console.log(selectedUser._id)
  
      if (selectedUser) {
        if (userType === 'donor') {
          await UpdateDonor(selectedUser._id, updatedUserData); 
          fetchDonors();
        } else {
          await UpdatePatient(selectedUser._id, updatedUserData); 
          fetchPatients();
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      closeModal();
    }
  };
  
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  return (
    <div className="w-[100%]">
      <table className="w-full overflow-x-auto table-fixed border-collapse shadow-md rounded-lg whitespace-nowrap mx-auto max-w-[90%]">
        <thead className="bg-gray-300 text-gray-800">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Profile</th>
            <th className="p-4">Blood Group</th>
            <th className="p-4">Address</th>
            <th className="p-4">Mobile</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(data)}
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-200">
              {console.log(item)}
              <td className="text-center p-4">{item.name}</td>
              <td className="text-center flex justify-center p-4">
                <img
                  className="w-[30px] h-[30px] rounded-lg"
                  src={item.profilePic}
                  alt={`Profile of ${item.name}`}
                />
              </td>
              <td className="text-center p-4">{item.bloodType}</td>
              <td className="text-center p-4">{item.address}</td>
              <td className="text-center p-4">{item.phone}</td>
              <td className="text-center p-4">
                <span className="flex items-center justify-center gap-x-3">
                  <BsFillTrashFill
                    className="cursor-pointer"
                    color="red"
                    size={20}
                    onClick={() => handleDeleteClick(item._id)}
                  />
                  <BsFillPencilFill
                    className="cursor-pointer"
                    color="green"
                    size={20}
                    onClick={() => handleEditClick(item)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <DonorEditModal
          user={selectedUser}
          onClose={closeModal}
          onUpdate={handleSaveUser}
        />
      )}
    </div>
  );
}

export default DonorTable;
