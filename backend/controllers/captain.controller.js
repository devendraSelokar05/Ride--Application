import { validationResult } from "express-validator";
import { Captain } from "../models/Captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { BlacklistToken } from "../models/BlacklistToken.model.js";


//registerCaptainController
export const registerCaptainController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { fullname, email, password, vehicle } = req.body;

    //Validation
    const isCaptainAlreadyExists = await Captain.findOne({ email });
    
    if(isCaptainAlreadyExists){
        return res.status(400).json({
            message: "Captain already exists"
        })
    }

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType

    })
    
    const token = captain.generateAuthToken();
    res.status(201).json({
        message: "Captain Created successfully",
        token: token,
        captain
    })
}

//logincontroller
export const Captainlogin = async (req, res) => {
  //Step1: check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // console.log(req.body)
    //Step2: get email and password
    const{email, password} = req.body

    //Step3: check if user exists
    const captain = await Captain.findOne({ email }).select('+password');
    //if user doesn't exist
    if(!captain){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    //Step4:check password is correct
    const isMatch = await captain.comparePassword(password);
    // check if password is not correct
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"        
        })
    }
    //step5: generate token
    const token = await captain.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({
        message: "Captain Logged in successfully",
        token: token,
    })

}

//getProfileController
export const getCaptainProfile = async(req, res) => {
    res.status(200).json(req.captain);
}

//logoutController
export const CaptainLogout = async (req, res) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.header('Authorization')?.split(' ')[ 1 ];
    await BlacklistToken.create({ token });
    res.status(200).json({
        message: "Captain Logged out successfully"
    });
}