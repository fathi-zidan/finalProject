import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        // match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, "password is not strong enough"]
      },
      role: {
        type: String,
        enum: ['Admin'],
        default: 'Admin',
      },
    },{timestamps:true});
    
const User = mongoose.model('User',userSchema);
export default User;