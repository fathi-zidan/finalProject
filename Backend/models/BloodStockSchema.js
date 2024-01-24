import mongoose from 'mongoose';

const bloodStockSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
        unique: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
    },
    units: {
        type: Number,
        default: 0,
    },
});

const BloodStock = mongoose.model('BloodStock', bloodStockSchema);

export default BloodStock;
