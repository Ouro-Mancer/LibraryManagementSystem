import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js"
import ErrorHandler from "../Middlewares/errorMiddlewares.js"
import { User } from "../Model/userModel.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { sendVerificationCode } from "../utils/sendVerificationCode.js"

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHandler("Please Enter all fields..", 400));
    }
    const isRegistered = await User.findOne({ email, accountVerified: true });
    if (isRegistered) {
      return next(new ErrorHandler("User already exists...", 400));
    }
    const registrationAttemptsByUser = await User.find({
      email,
      accountVerified: false,
    });
    // if (registrationAttemptsByUser) {
    //   return next(
    //     new ErrorHandler(
    //       "You have exceeded the number of registration attempts. Please contact support.",
    //       400
    //     )
    //   );
    // }
    if(password.length < 8 || password.length > 16){
        return next(new ErrorHandler("Password must between 8 to 16 characters", 400))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    const verificationCode = await user.generateVerificationCode();
    await user.save();
    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    next(error);
  }
});
