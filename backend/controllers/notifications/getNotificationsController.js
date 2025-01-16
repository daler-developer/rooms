const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");
const { PasswordAndPasswordRepeatDontMatch } = require("../../errors/auth");

const queryValidationSchema = yup.object({
  offset: yup.number().default(0)
});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("query", queryValidationSchema),
];

const initGetNotificationsController = (router) => {
  router.post(
    "/api/profile/notifications",
    middlewares,
    async (req, res, next) => {
      try {
        
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initGetNotificationsController;
