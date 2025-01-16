const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");
const { UserNotFound } = require("../../errors/users");

const paramsValidationSchema = yup.object({
  user_id: yup.number().required(),
});

const queryValidationSchema = yup.object({
  offset: yup.number().required(),
});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("params", paramsValidationSchema),
  validateMiddleware("query", queryValidationSchema),
];

const initGetUserFriendsController = (router) => {
  router.post(
    "/api/users/:user_id/friends",
    middlewares,
    async (req, res, next) => {
      try {
        const userRepository = new UserRepository();

        const userExists = await userRepository.userWithIdExists(
          req.params.user_id
        );

        if (!userExists) {
          throw new UserNotFound();
        }

        const friends = await userRepository.getUserFriends(req.params.user_id);

        return res.json({ friends });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initGetUserFriendsController;
