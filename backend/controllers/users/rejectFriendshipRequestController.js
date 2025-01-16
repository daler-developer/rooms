const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const {
  UserNotFound,
  FriendshipRequestNotExistsYet,
} = require("../../errors/users");
const validateMiddleware = require("../../middleware/validateMiddleware");

const paramsValidationSchema = yup.object({
  user_id: yup.number().required(),
});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("params", paramsValidationSchema),
];

const initRejectFriendshipRequestController = (router) => {
  router.post(
    "/api/users/:user_id/reject-friendship-request",
    middlewares,
    async (req, res, next) => {
      try {
        const userRepository = new UserRepository();

        const userExists = await userRepository.userWithIdExists(user_id);

        if (!userExists) {
          throw new UserNotFound({ user_id });
        }

        const friendshipRequestExists =
          await userRepository.friendshipRequestExists(
            req.params.user_id,
            req.user.id
          );

        if (!friendshipRequestExists) {
          throw new FriendshipRequestNotExistsYet();
        }

        await userRepository.deleteFriendshipRequest(
          req.params.user_id,
          req.user.id
        );

        return res.json({
          message: "Friendship request rejected successfully",
        });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initRejectFriendshipRequestController;
