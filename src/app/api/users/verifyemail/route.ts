import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    console.log(token);

    const user:any =await  User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if(!user) {
        return NextResponse.json({error:"Invalid Token or User not found"}, {status: 400})
    }

    console.log(user)

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();


    return NextResponse.json({message: "email is verfied", success: true})




    
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
