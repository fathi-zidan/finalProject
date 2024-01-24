import express from 'express'
import { check } from 'express-validator';
import {
    loginDonor, createDonor, getAllDonors, getDonorById,
    updateDonor, deleteDonor, getDonorDashboardStats, getDonationHistory, donateBlood
} from '../controllers/donorController.js'

const router = express.Router();

router.post('/create', [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('age').isInt({ min: 18 }).withMessage('Age must be at least 18 years'),
    check('bloodType').isIn(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']).withMessage('Invalid blood type'),
    check('phone').isMobilePhone().withMessage('Invalid phone number'),
    check('address').notEmpty(),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], createDonor)
router.post('/login', [check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')], loginDonor)
router.get('/donors', getAllDonors)
router.get('/donor/:id', getDonorById)
router.put('/donor/:id', updateDonor)
router.delete('/donor/:id', deleteDonor)
router.post('/donateBlood', donateBlood)
router.get('/donationHistory/:id', getDonationHistory)
router.get('/donationHistoryStatus/:id', getDonorDashboardStats)





export default router;