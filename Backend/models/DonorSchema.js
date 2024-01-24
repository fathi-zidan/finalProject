import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
    // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"password is not strong enough"]
  },
  role: {
    type: String,
    enum: ["Donor"],
    default: "Donor"
  },
  donationHistory: [
    {
      bloodType: {
        type: String,
        enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
      },
      bloodUnits:{
        type:Number,
      },
      diseases:[String],
      donationDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
      },
    },
  ],
}, { timestamps: true });
const Donor = mongoose.model('Donor', donorSchema);
export default Donor;