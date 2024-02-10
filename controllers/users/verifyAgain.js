import User from '#schemas/user.js';
import { verificationMail } from "#helpers/index.js";

export const verifyAgain = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!email) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Missing required field email",
      });
    }

    try {  
      if (user.verify) {
        return res.status(400).json({
          status: "Bad Request",
          code: 400,
          message: "Verification has already been passed",
        });
      }
  
      await verificationMail(email, user.verificationToken);
  
      return res.status(200).json({
        status: "Success",
        code: 200,
        message: "Verification email sent",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };