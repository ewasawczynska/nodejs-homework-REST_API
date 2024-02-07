import passport from "passport";
import { jwt } from './jwt.js';

export const auth = (req, res, next) => {
    passport.authenticate(jwt, (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Token is invalid',
          data: 'Unauthorized',
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
  