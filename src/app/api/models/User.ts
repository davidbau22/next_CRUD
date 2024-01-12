
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'the field name is required'],       
    },
    lastName: {
        type: String, 
        required: [true, 'the field lastName is required'],       
    },
    DOB: {
        type: String, 
        required: [true, 'the field DOB is required'],
    },
    gender: {
        type: String, 
        required: [true, 'the field gender is required'],
    }
})

const User = mongoose.models.User || mongoose.model('User',UserSchema);

export default User;