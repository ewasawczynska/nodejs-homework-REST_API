import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

const userSchema = new Schema(
{
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  this.password = hashedPassword;
};

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.setAvatar = async function (email) {
  const avatar = gravatar.profile_url(email);
  this.avatarURL = avatar;
};

const User = model("User", userSchema);

export default User;