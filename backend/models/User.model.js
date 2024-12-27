import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({

    fullname:{
        firstname:{
            type: String,
            required: true,  

        }, 
        lastname:{
            type: String,
        },

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minlength:[6, "password must be 6 character long"],
        select: false
    },
    socketId:{
        type: String,
    }
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

userSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

export const User = mongoose.model("User", userSchema)