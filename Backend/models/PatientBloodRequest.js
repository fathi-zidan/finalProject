import mongoose from 'mongoose';

const patientBloodRequestSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    patientAge: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
    },
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
}, { timestamps: true });

const PatientBloodRequest = mongoose.model('PatientBloodRequest', patientBloodRequestSchema);

export default PatientBloodRequest;
