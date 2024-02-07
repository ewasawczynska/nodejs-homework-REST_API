import User from '#schemas/user.js';

export const logout = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, { token: null });
      req.user = null;
    } catch (error) {
      next(error);
    }
    console.log("user was logged out");
    return res.status(204).end();
  };