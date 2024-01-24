import mongoose from 'mongoose'
// import User from '../models/UserSchema.js'
import Donor from '../models/DonorSchema.js';
import statusCode from '../constants/statusCode.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BloodRequest from '../models/BloodRequestSchema.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};


export const createDonor = async (req, res, next) => {
    try {
        const { name, email, age, diseases, bloodType, phone, address, profilePic, password, role } = req.body;
        if (!(name && email && age && diseases && bloodType && phone && address && password)) {
            return res.status(statusCode.BAD_REQUEST).send('Missing fields')
        }
        const existingDonor = await Donor.findOne({ email });
        if (existingDonor) {
            return res.status(statusCode.CONFLICT).json({ message: 'Email address already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword)
        const newDonor = await Donor.create({
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

        if (newDonor) {
            res.status(statusCode.CREATED).json({
                newDonor,
                token: generateToken(newDonor._id),
            });
        }

        // res.status(statusCode.CREATED).json({ newAdmin, token });

    } catch (error) {
        next(error)

    }
}

export const loginDonor = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401);
            throw new Error("All fields are required");
        }
        const donor = await Donor.findOne({ email });
        if (donor && (await bcrypt.compare(password, donor.password))) {
            res.json({
                donor,
                token: generateToken(donor._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        next(error);
    }
};
export const getAllDonors = async (req, res, next) => {
    try {
        const donors = await Donor.find()
        if (!donors) {
            return res.status(statusCode.NOT_FOUND).send("No donors found")
        }
        res.status(statusCode.OK).send(donors)

    } catch (error) {
        next(error)

    }

}
export const getDonorById = async (req, res, next) => {
    try {
        const donor = await Donor.findById(req.params.id)
        if (!donor) {
            return res.status(statusCode.NOT_FOUND).send("The specified user does exist")
        }
        res.status(statusCode.OK).send(donor)

    } catch (error) {
        next(error)

    }
}

export const updateDonor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(statusCode.NOT_FOUND).send("The donor with the given ID was not found");
        }
        Object.assign(donor, updatedFields);
        const updatedDonor = await donor.save();
        res.status(statusCode.OK).send(updatedDonor)
    } catch (error) {
        next(error)

    }
}

export const deleteDonor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const donor = await Donor.findByIdAndDelete(id);
        if (!donor) {
            return res.status(statusCode.NOT_FOUND).send("donor not found!");
        }
        res.status(statusCode.OK).send(donor);
    } catch (error) {
        next(error)

    }
}

export const donateBlood = async (req, res, next) => {
    try {
        const { donorId, bloodType, bloodUnits, diseases} = req.body;
        // Check if donor exists
        const donor = await Donor.findById(donorId);
        if (!donor) {
            return res.status(statusCode.NOT_FOUND).send('Donor not found!');
        }

        // Add the blood donation to the donor's history
        donor.donationHistory.push({
            bloodType,
            bloodUnits,
            diseases,
            status: 'Pending',
            donationDate: new Date(),
        });

        await donor.save();

        // // Create a blood request for admin approval
        // const bloodRequest = await BloodRequest.create({
        //     donor: donorId,
        //     bloodType,
        //     quantity: bloodUnits,
        //     diseases,
        //     donationDate,
        //     status: 'Pending',
        // });
    
        res.status(statusCode.CREATED).json({
            message: 'Blood donation request sent for admin approval',
            donor,
        });
    } catch (error) {
        next(error);
    }
};

export const getDonationHistory = async (req, res, next) => {
    try {
        const donorId = req.params.id;
        const donor = await Donor.findById(donorId);
        if (!donor) {
            return res.status(statusCode.NOT_FOUND).send('Donor not found!');
        }
        const donationHistory = donor.donationHistory;
        res.status(statusCode.OK).json({ donationHistory });
    } catch (error) {
        next(error);
    }
};

export const getDonorDashboardStats = async (req, res, next) => {
    try {
        const donorId = req.params.id;
        const donor = await Donor.findById(donorId);
        if (!donor) {
            return res.status(statusCode.NOT_FOUND).send('Donor not found!');
        }

        const totalBloodRequestsMade = donor.donationHistory.length;
        const totalBloodRequestsApproved = donor.donationHistory.filter(req => req.status === 'Approved').length;
        const totalBloodRequestsPending = donor.donationHistory.filter(req => req.status === 'Pending').length;
        const totalBloodRequestsRejected = donor.donationHistory.filter(req => req.status === 'Rejected').length;

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
