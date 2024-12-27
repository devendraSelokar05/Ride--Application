import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const captainSchema = new Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password:{
        type: String,
        required:true,
        minlength:[6, "password must be 6 character long"],
        select: false
    },
    socketId:{
        type: String,
   
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    location: {
        ltd:{
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate:{
            type: String,
            required: true,
            unique: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity:{
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['motorcycle', 'car', 'auto'],
        }
    },
},{timestamps: true})


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

captainSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password, this.password)   
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

export const Captain = mongoose.model('Captain', captainSchema)