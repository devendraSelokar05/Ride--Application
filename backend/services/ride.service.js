import { Ride } from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from 'crypto'

//calculate fare
export async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Both pickup and destination are required');
    }
    // console.log("Distance passed to getFare:", distance);
    const distanceTime = await getDistanceTime(pickup, destination);

    //genrated by using claudAi
    const baseFare = {
        auto: 30,
        car: 50,
       moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
       moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
       moto: 1.5
    };

    
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
       moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    console.log("Calculated Fares:", fare);
    return fare;
}

//otp generation while booking 
function getOtp(num){
    function generateOTP(num){
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
        return otp
    } 
    return generateOTP(num)

}

export const createRide = async ({
    user, pickup, destination, vehicleType, distance
})=>{
    if(!user || !pickup || !destination || !vehicleType || distance === undefined ){
        throw new Error('All fields are required');
    }
    // console.log("Distance in createRide:", distance);
    const fare = await getFare(pickup, destination);
    const ride = await Ride.create({
        user,
        pickup,
        destination,
        distance,
        vehicleType,
        otp: getOtp(4),
        fare : fare[vehicleType]
    });
    return ride
}

//confirmRide
export const confirmRide = async ({rideId, captain})=>{
    if(!rideId){
        throw new Error('RideId is required');
    }

    //updated captainid
    await Ride.findOneAndUpdate({
        _id:rideId
    },
    {
        status:'accepted',
        captain: captain._id
    }
)

    const ride = await Ride.findOne({
        _id:rideId

    }).populate('user').populate('captain').select("+otp");
    if(!ride){
        throw new Error('Ride not found');
    }

    return ride
}

export const startRide = async({rideId, otp, captain})=>{
    if(!rideId || !otp){
        throw new Error('RideId and OTP are required');
    }
    const ride = await Ride.findOne({
        _id:rideId
    }).populate('user').populate('captain').select("+otp");

    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status !== 'accepted'){
        throw new Error('Ride is not accepted');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }
    await Ride.findOneAndUpdate({
        _id:rideId
    },
    {
        status:'ongoing'
    }
    )
    return ride
}