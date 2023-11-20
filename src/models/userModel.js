import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "please provide an username "],
    },
    email:{
        type:String,
        required:[true, "Please provide and email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password cannot be empty"]
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken:String,
    verifyTokenExpiry:Date

})
// mongoose.model = {};
const User =mongoose.models.myusers || mongoose.model("myusers", userSchema)

export default User 