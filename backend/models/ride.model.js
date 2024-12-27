import mongoose, { Schema} from "mongoose";

const rideSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    vehicleType:{
        type: String,
        enum: ['auto', 'car', 'moto'],
        required: true
    },
    distance:{
        type: Number,
        default: 0
    },
    fare:{
        type: Number
    },
    status:{
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: Number,
    },//in seconds

    distance:{
        type: Number,   
        default: 0,
        min: 0    
    }, //in meters
    paymentID:{
        type: String
    },
    orderID:{
        type: String
    },
    signature:{
        type: String
    },
    otp:{
        type: String,
        select: false,
        required: true
    }
    

}, {timestamps: true})

export const Ride = mongoose.model('Ride', rideSchema)