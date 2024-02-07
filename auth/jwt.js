import passportJWT from "passport-jwt";
import User from '#schemas/user.js';
import { config } from "dotenv";
config();

export const jwt = new passportJWT.Strategy(
  {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload, done) => {
    User.find({ _id: payload.id })
        .then((user) => {
          if (!user) {
            return done(new Error('User not found'));
          }
          return done(null, user);
        })
        .catch((err) => {
            console.log(err);
            return done(err);
          });
  }
);