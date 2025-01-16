const passport = require("passport");

const initGetProfileController = (router) => {
  router.get(
    "/api/auth/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      return res.json({ user: req.user });
    }
  );
};

module.exports = initGetProfileController;
