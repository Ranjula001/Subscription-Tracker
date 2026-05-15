import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username is required'],
        trim : true,
        minlength : [3, 'Username must be at least 3 characters long'],
        maxlength : [30, 'Username must be at most 30 characters long'],
        unique : true,
    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        trim : true,
        lowercase : true,
        unique : true,
        match : [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },

    password : {
        type : String,
        required : [true, 'Password is required'],
        minlength : [6, 'Password must be at least 6 characters long'],
    }

} , { timestamps : true });

const User = mongoose.model('User', userSchema);

export default User;