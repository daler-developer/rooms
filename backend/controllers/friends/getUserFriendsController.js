const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");
const { PasswordAndPasswordRepeatDontMatch } = require("../../errors/auth");

const bodyValidationSchema = yup.object({
  password: yup.string().required().min(3).max(20),
  password_repeat: yup.string().required().min(3).max(20),
});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("body", bodyValidationSchema),
];

const initRegisterController = (router) => {
  router.post(
    "/api/profile/reset-password",
    middlewares,
    async (req, res, next) => {
      try {
        const userRepository = new UserRepository();

        const arePasswordAndPasswordRepeatEqual =
          req.body.password === req.body.password_repeat;

        if (arePasswordAndPasswordRepeatEqual) {
          throw new PasswordAndPasswordRepeatDontMatch();
        }

        await userRepository.changeUserPassword(req.user.id, req.body.password);

        return res.json({ message: "Successfully changed password" });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initRegisterController;
