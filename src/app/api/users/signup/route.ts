import { connect } from "@/dbConfig/dbConfig"

import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connect();



export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email,password} = reqBody

        console.log(reqBody)

        //check if user already exits;
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User Allready exists"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)


        const newUser = new User({
            username, email, password:hashedpassword
        })

        const savedUser = await newUser.save()

        console.log("Hello this is the saved user " + savedUser)

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message : "User created successfully",
            success:true,
            savedUser
        })

    } catch (error: any){
        return NextResponse.json({error: error.message + "ldkfj",},{status: 500})
    }
}