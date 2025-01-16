const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");
const {
  PasswordAndPasswordRepeatDontMatch,
  IncorrectOldPassword,
} = require("../../errors/auth");

const bodyValidationSchema = yup.object({
  old_password: yup.string().required().min(3).max(20),
  new_password: yup.string().required().min(3).max(20),
  new_password_repeat: yup.string().required().min(3).max(20),
});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("body", bodyValidationSchema),
];

const initResetPasswordControllerController = (router) => {
  router.post(
    "/api/profile/reset-password",
    middlewares,
    async (req, res, next) => {
      try {
        const userRepository = new UserRepository();

        const arePasswordAndPasswordRepeatEqual =
          req.body.new_password === req.body.new_password_repeat;

        if (!arePasswordAndPasswordRepeatEqual) {
          throw new PasswordAndPasswordRepeatDontMatch();
        }

        const isOldPasswordCorrect =
          req.user.password === req.body.old_password;

        if (!isOldPasswordCorrect) {
          throw new IncorrectOldPassword();
        }

        await userRepository.changeUserPassword(
          req.user.id,
          req.body.new_password
        );

        return res.json({ message: "Successfully changed password" });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initResetPasswordControllerController;
