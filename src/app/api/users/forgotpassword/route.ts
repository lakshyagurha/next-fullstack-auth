import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const email = reqBody.email
        console.log(email)


        const user =await User.findOne({email:email})

        if(!user){
            return NextResponse.json({message:"This email id do not exits"})
        }


        await sendEmail({email, emailType: "RESET", userId: user._id})




        return NextResponse.json({message: "Email found"})





    } catch(error:any){
        console.log(error)
        return NextResponse.json({error:error.message}, {status: 500})
    }

}