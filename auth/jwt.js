import passportJWT from "passport-jwt";
import User from '#schemas/user.js';
import { config } from "dotenv";
config();

const secret = process.env.SECRET;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

export const jwt = new passportJWT.Strategy(
  {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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