import express from "express"
import { body } from "express-validator"
import { getUserProfile, login, logout, registerUser } from "../controllers/user.controller.js"
import {authMiddleware}  from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').notEmpty().withMessage("Firstname is required"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
], registerUser)

router.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
], login)

router.get("/profile", authMiddleware.authUser, getUserProfile )
router.get("/logout", authMiddleware.authUser, logout)



export default router