import express from 'express'
import { getAllAdmins, createAdmin, loginUser,viewDonationRequests,
    approveOrRejectDonationRequest,viewBloodRequests,approveOrRejectBloodRequest, getDashboardStats  } from '../controllers/userController.js'
import {
    getAllPatients,
    getPatientById, updatePatient, deletePatient,
} from '../controllers/patientController.js'
import {
    getAllDonors, getDonorById,
    updateDonor, deleteDonor
} from '../controllers/donorController.js'


const router = express.Router();

router.post('/create', createAdmin)
router.post('/login', loginUser)
router.get('/admins', getAllAdmins)
router.put('/approval', approveOrRejectDonationRequest)
router.get('/dashboard', getDashboardStats)



//donor routes
router.get('/donors', getAllDonors);
router.put('/donors/:id',  updateDonor)
router.delete('/donors/:id', deleteDonor )
router.get('/donorsRequest', viewDonationRequests)

//patient routes
router.get('/patients', getAllPatients);
router.put('/patients/:id',  updatePatient)
router.delete('/patients/:id', deletePatient )
router.get('/patientsRequest', viewBloodRequests)
router.put('/bloodRequestApproval', approveOrRejectBloodRequest)




export default router;