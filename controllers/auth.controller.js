import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config.js';

//what is a request body ? req.body is and object that contains the data sent by the client in the body of an HTTP request. 
// It is commonly used in POST, PUT, and PATCH requests to send data to the server. 
// The req.body object is populated by middleware such as body-parser or express.json(), 
// which parses the incoming request and makes the data available in a structured format. 
// For example, if a client sends a JSON payload in a POST request, req.body will contain the parsed JSON object that can be accessed and 
// used in the server-side logic.

export const signUp = async (req, res, next) => {
    // Logic for user signup
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //logic to create a new user

        const {username, email, password} = req.body;

        //check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser) {
            const error = new Error('User already exists');
            error.status = 400;
            throw error;
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUsers = await User.create([{username, email, password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});  

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data:{
                token,
                user: newUsers[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }  
}

export const signIn = async (req, res, next) => {
    // Logic for user signin
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});

        if(!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }
        
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        });
        
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    // Logic for user signout
}