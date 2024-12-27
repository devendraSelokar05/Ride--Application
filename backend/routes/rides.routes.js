import express from "express";
import { body, query } from "express-validator";
import { confirmedRide,  createRideController, getFares, startRideController } from "../controllers/ride.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/create-ride',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    body('vehicleType').isIn(['moto', 'car', 'auto']).withMessage("Invalid Vehicle Type"),
    createRideController
)
router.get('/get-fare',
    query('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    query('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    authMiddleware.authUser,
    getFares
)

router.post('/confirm-ride',
    body('rideId').isMongoId().withMessage("Invalid Ride Id"),
     authMiddleware.authCaptain, confirmedRide)

router.get('/start-ride', 
    authMiddleware.authCaptain, 
    query('rideId').isMongoId().withMessage("Invalid Ride Id"),
    query('otp').isString().isLength({min:4, max:4}).withMessage("Invalid OTP"),
    startRideController)
export default router