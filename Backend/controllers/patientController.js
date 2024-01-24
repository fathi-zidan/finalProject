import mongoose from 'mongoose'
// import User from '../models/UserSchema.js'
// import Donor from '../models/DonorSchema.js';
import statusCode from '../constants/statusCode.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Patient from '../models/PatientSchema.js';
import PatientBloodRequest from '../models/PatientBloodRequest.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};


export const createPatient = async (req, res, next) => {
    try {
        const { name, email, age, diseases, bloodType, phone, address, profilePic, password, role } = req.body;
        if (!(name && email && age && diseases && bloodType && phone && address && password)) {
            return res.status(statusCode.BAD_REQUEST).send('Missing fields')
        }
        const existingDonor = await Patient.findOne({ email });
        if (existingDonor) {
            return res.status(statusCode.CONFLICT).json({ message: 'Email address already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword)
        const newPatient = await Patient.create({
            name,
            email,
            age,
            diseases: [...new Set(diseases)],
            bloodType,
            phone,
            address,
            profilePic,
            password: hashedPassword,
            role
        });

        if (newPatient) {
            res.status(statusCode.CREATED).json({
                newPatient,
                token: generateToken(newPatient._id),
            });
        }

        // res.status(statusCode.CREATED).json({ newAdmin, token });

    } catch (error) {
        next(error)

    }
}

export const loginPatient = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401);
            throw new Error("All fields are required");
        }
        const patient = await Patient.findOne({ email });
        if (patient && (await bcrypt.compare(password, patient.password))) {
            res.json({
                patient,
                token: generateToken(patient._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        next(error);
    }
};
export const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find()
        if (!patients) {
            return res.status(statusCode.NOT_FOUND).send("No patients found")
        }
        res.status(statusCode.OK).send(patients)

    } catch (error) {
        next(error)

    }

}
export const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id)
        if (!patient) {
            return res.status(statusCode.NOT_FOUND).send("The specified user does exist")
        }
        res.status(statusCode.OK).send(patient)

    } catch (error) {
        next(error)

    }
}

export const updatePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(statusCode.NOT_FOUND).send("The donor with the given ID was not found");
        }
        Object.assign(patient, updatedFields);
        const updatedPatient = await patient.save();
        res.status(statusCode.OK).send(updatedPatient)
    } catch (error) {
        next(error)

    }
}

export const deletePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(statusCode.NOT_FOUND).send("patient not found!");
        }
        res.status(statusCode.OK).send(patient);
    } catch (error) {
        next(error)

    }
}

export const requestBlood = async (req, res, next) => {
    try {
        const { patientId, bloodType, quantity, reason } = req.body;
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.NOT_FOUND).send('Patient not found!');
        }

        // Add the blood request to the patient's history
        patient.bloodRequestHistory.push({
            bloodType,
            quantity,
            reason,
            status: 'Pending',
            donationDate: new Date(),
        });

        await patient.save();

        res.status(statusCode.CREATED).json({
            message: 'Blood request sent',
            patient,
        });
    } catch (error) {
        next(error);
    }
};

export const getBloodRequestHistory = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.NOT_FOUND).send('Patient not found!');
        }
        const bloodRequestHistory = patient.bloodRequestHistory;
        res.status(statusCode.OK).json({ bloodRequestHistory });
    } catch (error) {
        next(error);
    }
};

export const getBloodRequestStats = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.NOT_FOUND).send('Patient not found!');
        }

        const bloodRequestHistory = patient.bloodRequestHistory;

        const totalBloodRequestsMade = bloodRequestHistory.length;
        const totalBloodRequestsApproved = bloodRequestHistory.filter(req => req.status === 'Approved').length;
        const totalBloodRequestsPending = bloodRequestHistory.filter(req => req.status === 'Pending').length;
        const totalBloodRequestsRejected = bloodRequestHistory.filter(req => req.status === 'Rejected').length;

        res.status(statusCode.OK).json({
            totalBloodRequestsMade,
            totalBloodRequestsApproved,
            totalBloodRequestsPending,
            totalBloodRequestsRejected,
        });
    } catch (error) {
        next(error);
    }
};