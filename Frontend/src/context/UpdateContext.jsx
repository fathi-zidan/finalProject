import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UpdateContext = createContext();

function UpdateContextProvider({children}) {
    const [updatedDonors, setUpdatedDonors] = useState([]);
    const [updatedPatients, setUpdatedPatients] = useState([]);
    const fetchDonors = async () => {
        try {
          const response = await axios.get('http://localhost:3000/donors/donors');
          setUpdatedDonors(response.data);
        } catch (error) {
          console.error('Error fetching donors:', error);
        }
      };
      const fetchPatients = async () => {
        try {
          const response = await axios.get('http://localhost:3000/patients/Patients');
          setUpdatedPatients(response.data);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };
  return (
   <UpdateContext.Provider value={{fetchDonors,fetchPatients}} >
    { children }
   </UpdateContext.Provider>
  )
}
export const useUpdateContext = () => useContext(UpdateContext);
export {UpdateContextProvider};

