const passport = require("passport");

const middlewares = [passport.authenticate("jwt", { session: false })];

const initGetProfileController = (router) => {
  router.post(
    "/api/profile/reset-password",
    middlewares,
    async (req, res, next) => {
      try {
        return res.json({ user: req.user });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initGetProfileController;
