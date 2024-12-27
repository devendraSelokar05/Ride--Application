import mongoose, {Schema} from "mongoose";

const blacklisttokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 86400
    }
})

export const BlacklistToken = mongoose.model('BlacklistToken', blacklisttokenSchema)


