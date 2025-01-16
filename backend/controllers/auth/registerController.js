const yup = require("yup");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");
const {
  UsernameAlreadyExists,
  PasswordAndPasswordRepeatDontMatch,
} = require("../../errors/auth");
const TokenService = require("../../service/tokenService");

const bodyValidationSchema = yup.object({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
  password_repeat: yup.string().required().min(3).max(20),
  first_name: yup.string().required().min(3).max(20),
  last_name: yup.string().required().min(3).max(20),
});

const middlewares = [validateMiddleware("body", bodyValidationSchema)];

const initRegisterController = (router) => {
  router.post("/api/auth/register", ...middlewares, async (req, res, next) => {
    try {
      const tokenService = new TokenService();
      const userRepository = new UserRepository();

      const arePasswordAndPasswordRepeatEqual =
        req.body.password === req.body.password_repeat;

      if (!arePasswordAndPasswordRepeatEqual) {
        throw new PasswordAndPasswordRepeatDontMatch();
      }

      const userAlreadyExists =
        await userRepository.checkIfUserWithUsernameExists(req.body.username);

      if (userAlreadyExists) {
        throw new UsernameAlreadyExists();
      }

      await userRepository.createUser({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });

      const createdUser = await userRepository.getUserByUsername(
        req.body.username
      );

      const accessToken = tokenService.createAccessToken(createdUser.id);

      return res.json({ user: createdUser, access_token: accessToken });
    } catch (e) {
      return next(e);
    }
  });
};

module.exports = initRegisterController;
