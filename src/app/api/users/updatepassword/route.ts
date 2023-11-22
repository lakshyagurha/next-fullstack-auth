
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { password, userid } = reqBody;

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);

        const user = await User.findByIdAndUpdate(
            userid,
            {
                password: hashedpassword,
                forgetPasswordTokenExpiry: Date.now() + 3600000,
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            console.log("Something went wrong. User doesn't exist");
            return NextResponse.json(
                {
                    message: "Something went wrong. This user is not found in our database, please try again",
                },
                { status: 400 }
            );
        }

        return NextResponse.json({ message: "Password updated successfully. Please login." }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}


// import User from "@/models/userModel";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextResponse, NextRequest } from "next/server";
// import bcryptjs from "bcryptjs";

// connect();

// export async function POST(reqeust: NextRequest) {
//     try{
//         const reqBody = await reqeust.json();
//         const { password, userid } = reqBody;
//         // hash password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedpassword = await bcryptjs.hash(password, salt);
      
//         const user = await User.findByIdAndUpdate(
//           userid,
//           {
//             password: hashedpassword,
//             forgetPasswordTokenExpiry: Date.now() + 3600000,
//           },
//           { new: true, runValidators: true }
//         );
      
      
      
      
      
      
//         if (!user) {
//           console.log("Something went wrong user dosent exists");
//           return NextResponse.json(
//             {
//               message:
//                 "Something went wrong. This user is not found in our database please try again",
//             },
//             { status: 400 }
//           );
//         }
      
//         return NextResponse.json({message: "passworld updated succesully please login"}, {status: 400})

//     } catch(error: any){
//         console.log(error)
//         return NextResponse.json({message:"Something went wrong"}, {status: 500})

//     }
// }
