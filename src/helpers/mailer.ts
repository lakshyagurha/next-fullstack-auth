import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log(email, emailType, userId, "this is the mailer.ts");
  try {
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hasedToken, verifyTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hasedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "731e3917557d25",
        pass: "4aab0bae0e1e7c",
      },
    });

    const mailoptions = {
        from: "lakshyagurha@gmial.com",
        to: email,
        subject:
          emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
        html: `<p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hasedToken}">here</a> to ${
          emailType === "VERFITY" ? "Verify your email" : "Reset Your Password"
        }  or copy paste the link in your browser <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${hasedToken}</p>`,
      };
      
    const mailresponse = await transport.sendMail(mailoptions);
    return mailresponse;
  } catch (error: any) {
    console.log(error.message)
    throw new Error(error.message);
  }
};
