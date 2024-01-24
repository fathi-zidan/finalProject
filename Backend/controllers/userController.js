import mongoose from 'mongoose'
import User from '../models/UserSchema.js'
import Donor from '../models/DonorSchema.js';
import Patient from '../models/PatientSchema.js';
import BloodRequest from '../models/BloodRequestSchema.js';
import BloodStock from '../models/BloodStockSchema.js'
import statusCode from '../constants/statusCode.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//generates random token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};


export const createAdmin = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!(username && password)) {
      return res.status(statusCode.BAD_REQUEST).send('Missing fields')
    }
    const trimmedPassword = password.trim();
    // console.log(trimmedPassword)
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    // console.log(hashedPassword)
    const newAdmin = await User.create({ username, password: hashedPassword, role });

    if (newAdmin) {
      res.status(statusCode.CREATED).json({
        id: newAdmin.id,
        username: newAdmin.username,
        token: generateToken(newAdmin._id),
      });
    }

    // res.status(statusCode.CREATED).json({ newAdmin, token });

  } catch (error) {
    next(error)

  }
}

export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await User.find()
    if (!admins) {
      return res.status(statusCode.NOT_FOUND).send("No admin found")
    }
    res.status(statusCode.OK).send({ admins: admins })

  } catch (error) {
    next(error)

  }

}
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(401);
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};
export const viewDonationRequests = async (req, res, next) => {
  try {
    const donationRequests = await BloodRequest.find({ status: 'Pending' });

    res.status(statusCode.OK).json({ donationRequests });
  } catch (error) {
    next(error);
  }
};
export const approveOrRejectDonationRequest = async (req, res, next) => {
  try {
    const { requestId, donorId, approvalStatus } = req.body;
    // const donationRequest = await BloodRequest.findById(requestId);
    const donor = await Donor.findById(donorId);
    // console.log(donor)

    if (!donor) {
      return res.status(statusCode.NOT_FOUND).send("Donation request not found or already processed");
    }
    const donationRequest = donor.donationHistory.id(requestId);
    console.log(donationRequest)
    
    console.log('Before Status Update:', donationRequest.status);

    if (approvalStatus === 'Approved') {
      // donationRequest.status = 'Approved';
      donationRequest.status = 'Approved';
      // donor.donationHistory.status = 'Approved';
      // Add the donated blood units to the blood stock
      const bloodStock = await BloodStock.findOne({ bloodType: donationRequest.bloodType });

      if (bloodStock) {
        bloodStock.units += donationRequest.bloodUnits;
        await bloodStock.save();
      } else {
        await BloodStock.create({
          bloodType: donationRequest.bloodType,
          units: donationRequest.bloodUnits,
        });
      }
    } else if (approvalStatus === 'Rejected') {
      donationRequest.status = 'Rejected';
    } else {
      return res.status(statusCode.BAD_REQUEST).send("Invalid approval status");
    }
    await donor.save();
    console.log('After Status Update:', donationRequest.status);

    res.status(statusCode.OK).json({ message: "Donation request processed successfully" });
  } catch (error) {
    next(error);
  }
};

export const viewBloodRequests = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    // Extract blood requests from each patient's bloodRequestHistory
    const bloodRequests = patients.flatMap(patient => patient.bloodRequestHistory.filter(request => request.status === 'Pending'));

    res.status(statusCode.OK).json({ bloodRequests });
  } catch (error) {
    next(error);
  }
};

export const approveOrRejectBloodRequest = async (req, res, next) => {
  try {
    const { requestId, patientId, approvalStatus } = req.body;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(statusCode.NOT_FOUND).send("Patient not found");
    }

    const bloodRequest = patient.bloodRequestHistory.id(requestId);
    console.log(bloodRequest)

    if (!bloodRequest || bloodRequest.status !== 'Pending') {
      return res.status(statusCode.NOT_FOUND).send("Blood request not found or already processed");
    }

    if (approvalStatus === 'Approved') {
      bloodRequest.status = 'Approved';

      // Add the approved blood request to the blood stock
      const bloodStock = await BloodStock.findOne({ bloodType: bloodRequest.bloodType });

      if (bloodStock) {
        if (bloodStock.units >= bloodRequest.quantity) {
          bloodStock.units -= bloodRequest.quantity;
          await bloodStock.save();
        } else {
          return res.status(statusCode.BAD_REQUEST).send("Insufficient blood units in stock");
        }
      } else {
        return res.status(statusCode.BAD_REQUEST).send("Blood type not found in stock");
      }
    } else if (approvalStatus === 'Rejected') {
      bloodRequest.status = 'Rejected';
    } else {
      return res.status(statusCode.BAD_REQUEST).send("Invalid approval status");
    }

    await patient.save();

    res.status(statusCode.OK).json({ message: "Blood request processed successfully" });
  } catch (error) {
    next(error);
  }
};

// Import necessary models and dependencies

export const getDashboardStats = async (req, res, next) => {
  try {
    // Get the total units of blood for each blood group
    const bloodStock = await BloodStock.find();

    // Get the total number of donors
    const totalDonors = await Donor.countDocuments();

    // Get the total number of blood requests from patients
    const totalPatientBloodRequests = await Patient.countDocuments({
      'bloodRequestHistory.status': 'Approved',
    });

    // Get the total number of approved blood donations from donors
    const totalDonorBloodDonations = await Donor.countDocuments({
      'donationHistory.status': 'Approved',
    });

    // Calculate the total number of approved requests from both donors and patients
    const totalApprovedRequests = totalPatientBloodRequests + totalDonorBloodDonations;

    // Calculate the total units of blood
    const totalUnitsOfBlood = bloodStock.reduce((total, stock) => total + stock.units, 0);

    res.status(statusCode.OK).json({
      bloodStock,
      totalDonors,
      totalBloodRequests: totalPatientBloodRequests,
      totalApprovedRequests,
      totalUnitsOfBlood,
    });
  } catch (error) {
    next(error);
  }
};






