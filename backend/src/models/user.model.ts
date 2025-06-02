import mongoose from "mongoose";


interface IUser {
    username: string;
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
    
}, {timestamps: true});


const User = mongoose.model<IUser>("User", userSchema);

export default User;