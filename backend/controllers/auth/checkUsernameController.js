const yup = require("yup");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");

const bodyValidationSchema = yup.object({
  username: yup.string().required().min(3).max(20),
});

const middlewares = [validateMiddleware("body", bodyValidationSchema)];

const initCheckUsernameController = (router) => {
  router.post(
    "/api/auth/check-username",
    ...middlewares,
    async (req, res, next) => {
      try {
        const userRepository = new UserRepository();

        const exists = await userRepository.checkIfUserWithUsernameExists(
          req.body.username
        );

        return res.json({ exists });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initCheckUsernameController;
