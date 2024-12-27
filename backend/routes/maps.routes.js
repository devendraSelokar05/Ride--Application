import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAutoSuggestion, getCoordinates, getDistanceandtime } from "../controllers/map.controller.js";
import { query } from "express-validator";



const router = express.Router();

router.get("/get-coordinates", 
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser, getCoordinates) 

    router.get("/get-distance-time",
        query('origin').isString().isLength({min: 3}),
        query('destination').isString().isLength({min: 3}),
        authMiddleware.authUser, getDistanceandtime
    )

    router.get("/get-suggestions",
        query('input').isString(),
        authMiddleware.authUser, getAutoSuggestion
    )
export default router