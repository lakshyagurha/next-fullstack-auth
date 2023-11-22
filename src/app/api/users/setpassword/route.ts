import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";


connect();

export async function POST (request: NextRequest){
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token)

        const user :any =await  User.findOne({
            forgotPasswordToken: token,
            forgetPasswordTokenExpiry: { $gt: Date.now() },

        })
        if(!user) {
            return NextResponse.json({message:"Invalid Token or User not found"}, {status: 400})
        }
        console.log(user)

        user.forgotPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save()

        return NextResponse.json({message: "Your token is verified now you can change the password", success: true, userId:user._id})
    } catch( error :any){
        console.log(error)
        return NextResponse.json({message: error.message}, {status: 500})
    }
} 