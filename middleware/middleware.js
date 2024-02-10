import passport from "passport";
import { jwt } from './jwt.js';

export const jwtMiddleware = (app) => {
  passport.use(jwt);
};