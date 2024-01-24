import express from 'express'
import { check } from 'express-validator';
import { loginPatient, createPatient, getAllPatients,
     getPatientById, updatePatient, deletePatient,
     getBloodRequestHistory,requestBlood,getBloodRequestStats } from '../controllers/patientController.js'

const router = express.Router();

router.post('/create', [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18 years'),
    check('bloodType').isIn(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']).withMessage('Invalid blood type'),
    check('phone').isMobilePhone().withMessage('Invalid phone number'),
    check('address').notEmpty(),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], createPatient)
router.post('/login', [check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')], loginPatient)
router.get('/patients', getAllPatients)
router.get('/patient/:id', getPatientById)
router.put('/patient/:id', updatePatient)
router.delete('/patient/:id', deletePatient)
router.post('/requestBlood', requestBlood)
router.get("/bloodRequests/:id", getBloodRequestHistory)
router.get('/bloodRequestStats/:id', getBloodRequestStats)



export default router;