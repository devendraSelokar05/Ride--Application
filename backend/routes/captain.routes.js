import express from "express"
import { body } from "express-validator"
import { Captainlogin, CaptainLogout, getCaptainProfile, registerCaptainController } from "../controllers/captain.controller.js"
import {authMiddleware}  from "../middlewares/auth.middleware.js"


const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').notEmpty().withMessage("Firstname is required"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({min: 3}).withMessage("Color must be at least 3 characters long"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Model must be at least 3 characters long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Capacity must be atleast 1"),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage("Invalid Vehicle Type"),
    

],registerCaptainController)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
],Captainlogin)

router.get('/profile', authMiddleware.authCaptain, getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, CaptainLogout)

export default router