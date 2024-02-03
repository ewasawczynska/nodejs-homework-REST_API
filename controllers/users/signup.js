import User from '#schemas/user.js';
import { schema } from '#validation/validation.js';

export async function signup(req, res) {
    const { email, password } = req.body;
    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({ 
            status: "Bad Request",
            code: 400,
            message: "Validation error",
    });
    }
  
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = new User({ email });
      const { subscription } = newUser;
      newUser.setPassword(password);
      await newUser.save();
  
      return res.status(201).json({
        status: "Created",
        code: 201,
        data: { email, subscription },
        message: "Successful registration!",
      });
    }

    else {
        return res.status(409).json({
            status: "Conflict",
            code: 409,
            message: "Email in use",
          });
    }
  }