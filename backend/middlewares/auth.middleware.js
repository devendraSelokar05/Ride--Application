import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import { BlacklistToken } from '../models/BlacklistToken.model.js'; 
import { Captain } from '../models/Captain.model.js';

const authUser = async (req, res, next) => {
    try {
        // Get token from cookie or header
        const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Please login to access this resource"
            });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if(isBlacklisted){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        const user = await User.findById(decoded._id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message: "Please login to access this resource"
            })
        }

        const isBlacklisted = await BlacklistToken.findOne({ token: token });

        if(isBlacklisted){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        //decode
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user from token
        const captain = await Captain.findById(decoded._id).select('-password');
        
        if(!captain){
            return res.status(401).json({
                message: "Captain not found"
            })
        }
        req.captain = captain;
        next();
    } catch (error) {
       res.status(401).json({
           message: "Invalid token"
       }) 
    }
}

export const authMiddleware = {
  authUser,
  authCaptain
};
