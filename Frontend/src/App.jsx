import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import HospitalPage from './pages/HospitalPage.jsx'
import DonorTable from './components/DonorTable.jsx'
import DonorEditModal from './components/DonorEditModal.jsx'
import DonorPage from './pages/DonorPage.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import LoginComponent from './components/LoginComponent.jsx'
import SignUpComponent from './components/SignUpComponent.jsx'
import { DataProvider } from './context/DataContext.jsx'
import PatientPage from './pages/PatientPage.jsx'
import DonationRequests from './components/DonationRequests.jsx'
import DonationsPage from './pages/DonationsPage.jsx'
import BloodRequestPage from './pages/BloodRequestPage.jsx'
import { UpdateContextProvider } from './context/UpdateContext.jsx'
import DonorHomePage from './pages/DonorHomePage.jsx'
import DonationForm from './components/DonationForm.jsx'
import DonateBloodPage from './pages/DonateBloodPage.jsx'
import DonorHistoryPage from './pages/DonorHistoryPage.jsx'
import PatientHomePage from './pages/PatientHomePage.jsx'
import PatientHistoryPage from './pages/PatientHistoryPage.jsx'
import RequestBloodPage from './pages/RequestBloodPage.jsx'
import LogoutPage from './pages/LogoutPage.jsx'

function App() {
  return (
    <section>
      <AuthProvider>
        <DataProvider>
          <UpdateContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/hospital" element={<HospitalPage />}></Route>
          <Route path="/hospital/donor" element={<DonorPage />}></Route>
          <Route path="/hospital/patient" element={<PatientPage/>}></Route>
          <Route path="/hospital/modal" element={<DonorEditModal />}></Route>
          <Route path="/Admin/login" element={<AdminLogin />}></Route>
          <Route path="/donor/login" element={<LoginComponent userType='donor' />} />
          <Route path="/patient/login" element={<LoginComponent userType='patient' />} />
          <Route path="/donor/signUp" element={<SignUpComponent userType='donor' />} />
          <Route path="/patient/signUp" element={<SignUpComponent userType='patient' />} />
          <Route path="/hospital/donations" element={<DonationsPage/>} />
          <Route path="/hospital/bloodRequest" element={<BloodRequestPage/>} />
          <Route path="/donor/home" element={<DonorHomePage />}></Route>
          <Route path="/donor/donateBlood" element={<DonateBloodPage/>}></Route>
          <Route path="/donor/donationHistory" element={<DonorHistoryPage/>}></Route>
          <Route path="/patient/home" element={<PatientHomePage />}></Route>
          <Route path="/patient/requestBlood" element={<RequestBloodPage/>}></Route>
          <Route path="/patient/bloodRequestHistory" element={<PatientHistoryPage/>}></Route>
          <Route path="/logout" element={<LogoutPage/>}></Route>
        </Routes>
        </UpdateContextProvider>
        </DataProvider>
      </AuthProvider>

    </section>
  )
}

export default App
