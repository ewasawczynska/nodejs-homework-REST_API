import { Schema, model } from "mongoose";

const {Schema, model} = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      maxlength: 70,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 170,
    },
    phone: {
      type: String,
      unique: true,
    },
    favourite: {
        type: Boolean,
      },
  },
  { versionKey: false, timestamps: true },
);

const contactModel = model("contact", contactSchema);

export default contactModel;
