import passport from "passport";
import passportJWT from "passport-jwt";
import { config } from "dotenv";

import User from '#schemas/user.js';

config();

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(params, function (payload, done) {
      User.find({ _id: payload.id })
        .then(([user]) => {
          if (!user) {
            return done(new Error('User not found'));
          }
          return done(null, user);
        })
        .catch((err) => {
            console.log(err);
            return done(err);
          });
    }),
  );