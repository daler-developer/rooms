const passport = require("passport");
const jwt = require("jsonwebtoken");

const initLoginController = (router) => {
  router.post(
    "/api/auth/login",
    passport.authenticate("local", { session: false }),
    async (req, res) => {
      const token = jwt.sign({ userId: req.user.id }, "jwt_secret", {
        expiresIn: "2 days",
      });

      return res.json({
        token,
        user: req.user,
      });
    }
  );
};

module.exports = initLoginController;
