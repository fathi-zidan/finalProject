import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "email is not in the right format"]
  },
  age: {
    type: Number,
    required: true,
  },
  diseases: [String],
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "password is not strong enough"]
  },
  role: {
    type: String,
    enum: ["Patient"],
    default: "Patient"
  },
  bloodRequestHistory: [
    {
        bloodType: {
            type: String,
            required: true,
            enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
        },
        quantity: {
            type: Number,
            required: true,
        },
        reason: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
        donationDate: {
            type: Date,
            default: Date.now,
        },
    },
],

}, { timestamps: true });
const Patient = mongoose.model('Patient', patientSchema);
export default Patient;