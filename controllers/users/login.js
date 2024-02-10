import jwt from "jsonwebtoken";
import User from '#schemas/user.js';
import { schema } from '#validation/validation.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({
          status: "Unauthorized",
          code: 401,
          message: "Email or password is wrong",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      return res.status(200).json({
        status: "Success",
        code: 200,
        data: {
          token,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Validation error",
      });
    }
  };