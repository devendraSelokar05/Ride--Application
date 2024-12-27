import { createRide } from "../services/ride.service.js";
import { getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getCaptainInTheRadius } from "../services/maps.service.js";
import { getAddressCoordiante } from "../services/maps.service.js";
import { getDistanceTime } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../models/ride.model.js";
import { confirmRide } from "../services/ride.service.js";
import { startRide } from "../services/ride.service.js";

//Create Ride
export const createRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const{userId, pickup, destination, vehicleType} = req.body
 try {
    // Get distance and time
    const distanceTime = await getDistanceTime(pickup, destination);
    // console.log(distanceTime)
    const distance = distanceTime.distance.value / 1000; 
    // console.log(distance)

    const ride = await createRide({
        user: req.user._id, 
        pickup, 
       distance,
        destination, 
        vehicleType,
    });

    const pickupCoordinates = await getAddressCoordiante(pickup)
    // console.log(pickupCoordinates)

    const captainInRadius = await getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5)
    // console.log(captainInRadius)

    ride.otp = ""
    ride.distance = distance

    const rideWithUser = await Ride.findOne({_id:ride._id}).populate('user')

    captainInRadius.map((captain)=>{
        sendMessageToSocketId(captain.socketId,{
            event: 'new-ride',
            data: rideWithUser
        })
    })

    return res.status(201).json({
        message: "Ride Created Successfully",
        ride: rideWithUser
    })
    
 } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    })
 }

}

export const getFares = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {pickup, destination} = req.query;
    try{
        const fare = await getFare(pickup, destination);
        res.status(200).json(fare);
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

//created confirmRide function 
export const confirmedRide = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {rideId} = req.body;
    try {
        // Corrected method call to confirmRide service
        const ride = await confirmRide({rideId, captain: req.captain});

        //ride confirmed hogayi hai usko hum trigger karenge yeah update karenge userhome.jsx me
        sendMessageToSocketId(ride.user.socketId, {
            event: 'confirm-ride', 
            data: ride
        })
        res.status(200).json({
            message: "Ride Confirmed Successfully",
            ride
        })
    } catch (error) {
        console.error('Error confirming ride:', error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//ridecontroller
export const startRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })  
    }
    const {rideId, otp} = req.query
    try {
        const ride = await startRide({rideId, otp, captain: req.captain});
        
        //send message to user
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started', 
            data: ride
        })
        res.status(200).json({
            message: "Ride Started Successfully",
            ride
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}