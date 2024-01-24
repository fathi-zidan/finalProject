// DataContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [bloodStock, setBloodStock] = useState([]);
  const [totals, setTotals] = useState({
    totalDonors: 0,
    totalBloodRequests: 0,
    totalApprovedRequests: 0,
    totalUnitsOfBlood: 0,
  });
  const [donorTotals, setDonorTotals] = useState({});
  const [patientTotals, setPatientTotals] = useState({});
  const [history,setHistory] = useState([]);
  const [bloodHistory,setBloodHistory] = useState([]);


  const fetchDonors = async () => {
    try {
      const response = await axios.get('https://blood-bank-j5i9.onrender.com/donors/donors');
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://blood-bank-j5i9.onrender.com/patients/Patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchBloodStock = async () => {
    try {
      const response = await axios.get('https://blood-bank-j5i9.onrender.com/Admin/dashboard');
      setBloodStock(response.data.bloodStock);
      setTotals({
        totalDonors: response.data.totalDonors,
        totalBloodRequests: response.data.totalBloodRequests,
        totalApprovedRequests: response.data.totalApprovedRequests,
        totalUnitsOfBlood: response.data.totalUnitsOfBlood,
      });
      console.log(bloodStock)


    } catch (error) {
      console.log("Error in fetching blood stock", error.response.data);

    }
  }

  const fetchDonorHistoryStatus = async () => {
    try {
      const currentDonor = localStorage.getItem("donor");
      const parsedDonor = JSON.parse(currentDonor);
      const res = await axios.get(`https://blood-bank-j5i9.onrender.com/donors/donationHistoryStatus/${parsedDonor.donor._id}`);
      setDonorTotals(res.data)
      console.log(res.data);
      console.log(donorTotals)
    } catch (error) {
      console.log(error.response.message)
    }
  }

  const fetchPatientHistoryStatus = async () => {
    try {
      const currentPatient = JSON.parse(localStorage.getItem('patient'));
      console.log(currentPatient)
      const res = await axios.get(`https://blood-bank-j5i9.onrender.com/patients/bloodRequestStats/${currentPatient.patient._id}`);
      setPatientTotals(res.data)
      console.log(res.data);
      console.log(patientTotals)
    } catch (error) {
      console.log(error.response.message)
    }
  }
  
  const getDonationHistory = async()=>{
      try {
          const currentDonor = JSON.parse(localStorage.getItem('donor'));
          const response = await axios.get(`https://blood-bank-j5i9.onrender.com/donors/donationHistory/${currentDonor.donor._id}`);
          setHistory(response.data)
          console.log(response.data)
          
      } catch (error) {
          console.log(error.response);
          
      }
  }

  const getBloodRequestHistory = async()=>{
    try {
        const currentPatient = JSON.parse(localStorage.getItem('patient'));
        console.log(currentPatient)
        const response = await axios.get(`https://blood-bank-j5i9.onrender.com/patients/bloodRequests/${currentPatient.patient._id}`);
        setBloodHistory(response.data)
        console.log(response.data)
        
    } catch (error) {
        console.log(error.response);
        
    }
}

const UpdateDonor = async(donorId,updatedData)=>{
  try {
    const response = await axios.put(`https://blood-bank-j5i9.onrender.com/donors/donor/${donorId}`,updatedData)
    console.log(response.data);
    
  } catch (error) {
    console.log(error.response)
    
  }
}

const UpdatePatient = async(patientId,updatedData)=>{
  try {
    const response = await axios.put(`https://blood-bank-j5i9.onrender.com/patients/patient/${patientId}`,updatedData)
    console.log(response.data);
    
  } catch (error) {
    console.log(error.response)
    
  }
}


  const fetchData = async () => {
    await fetchDonors();
    await fetchPatients();
    await fetchBloodStock();
    await fetchDonorHistoryStatus();
    await getDonationHistory();
    await fetchPatientHistoryStatus();
    await getBloodRequestHistory();
    // await UpdateDonor();
    // await UpdatePatient();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated bloodStock:", bloodStock);
  }, [bloodStock]);

  return (
    <DataContext.Provider value={{ donors, patients, fetchPatients, fetchDonors, 
    bloodStock, setBloodStock, fetchBloodStock, totals,donorTotals,
    history,getDonationHistory,bloodHistory,getBloodRequestHistory,
    patientTotals,UpdateDonor,UpdatePatient,fetchDonorHistoryStatus,fetchPatientHistoryStatus }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
export { DataProvider };


