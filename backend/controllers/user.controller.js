import { validationResult } from "express-validator";
import { User } from "../models/User.model.js";
import { createUser } from "../services/user.service.js";
import { BlacklistToken } from "../models/BlacklistToken.model.js";

//registercontroller
export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  // Fixed this line
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { fullname, email, password } = req.body;
    const isUserExists = await User.findOne({ email });
    if(isUserExists){
        return res.status(400).json({
            message: "User already exists",
        });
    }
    const hashedPassword = await User.hashPassword(password);
    
    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    

    const token = user.generateAuthToken();
    res.status(201).json({
        message: "User Created successfully",
        token: token,
        user: user
    });

};

//logincontroller
export const login = async (req, res, next) => {
    // Step1: check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()}
        )
    }
    //Step2: get email and password
    const {email, password} = req.body

    //Step3: check if user exists
    const user = await User.findOne({ email }).select('+password');
    // if user doesn't exist
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    //Step4:check password is correct
    const isMatch = await user.comparePassword(password);

    //Step5: check if password is not correct
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    //Step6: generate token
    const token = user.generateAuthToken();
    //Step7: set cookie
    res.cookie('token', token)

    //Step8: send response
    res.status(200).json({
        message: "User Logged in successfully",
        token: token
    });
}

//getuserProfileController

export const getUserProfile = async(req, res, next) =>{
    res.status(200).json(req.user);
}

//logoutController
export const logout = async (req, res, next) => {
    // Step1: clear cookie
    res.clearCookie('token');
    // Step2: blacklist token
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[ 1 ];
    await BlacklistToken.create({ token });

    res.status(200).json({
        message: "User Logged out successfully"
    });
}