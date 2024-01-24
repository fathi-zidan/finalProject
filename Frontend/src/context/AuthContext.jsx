import React, { Children } from 'react'
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [donors, setDonors] = useState({});
    const [patients, setPatients] = useState({});
    const navigate = useNavigate();

    const AdminLogIn = async (user) => {
        try {
            const res = await axios.post('http://localhost:3000/Admin/login', user)
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            setCurrentUser(res.data);
            navigate("/hospital");
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    const DonorLogIn = async (donor) => {
        try {
            const res = await axios.post('http://localhost:3000/donors/login', donor)
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("donor", JSON.stringify(res.data));
            setDonors(res.data);
            navigate("/donor/home");
        } catch (error) {
            console.log("Error: ", error);
        }

    }
    const PatientLogIn = async (patient) => {
        try {
            const res = await axios.post('http://localhost:3000/patients/login', patient)
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("patient", JSON.stringify(res.data));
            setPatients(res.data);
            navigate("/patient/home");
        } catch (error) {
            console.log("Error: ", error.response.data.message);
        }

    }
    const createDonor = async (donor) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/donors/create",
                donor
            );
            console.log(res.data);
            navigate("/donor/login");
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const createPatient = async (patient) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/patients/create",
                patient
            );
            console.log(res.data);
            navigate("/patient/login");
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    return (
        <LoginContext.Provider value={{
            currentUser, setCurrentUser,
            AdminLogIn, donors, setDonors, DonorLogIn, 
            PatientLogIn, patients,createDonor,createPatient
        }}>
            {children}
        </LoginContext.Provider>
    )
}
export const useLogInContext = () => useContext(LoginContext);
export { AuthProvider };

