import { v4 as uuidv4 } from "uuid";
import User from '#schemas/user.js';
import { schema } from '#validation/validation.js';
import { verificationMail } from '#helpers/index.js';

export async function signup(req, res, next) {
    const { email, password } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const user = await User.findOne({email});
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    try {
      const existingEmail = await User.findOne({email});
      if (existingEmail) {
        return res.status(409).json({
          status: 'error',
          code: 409,
          message: 'Email is already in use',
          data: 'Conflict',
      });
    }

    const verificationToken = uuidv4();
    const newUser = new User({ email, verificationToken });
    const { subscription } = newUser;
    newUser.setAvatar(email);
    await newUser.setPassword(password);
    await newUser.save();
    await verificationMail(email, verificationToken);
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          message: 'Registration successful. Please check your mailbox and verify your email.',
        },
      });
    } catch (error) {
      console.log(error);
      console.log('Registration unsuccessful :(');
      next(error);
    }
  };