const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const {
  UserNotFound,
  FriendshipRequestNotExistsYet,
} = require("../../errors/users");

const middlewares = [passport.authenticate("jwt", { session: false })];

const validationSchema = yup.object({
  user_id: yup.number().required(),
});

const initCancelRequestFriendshipController = (router) => {
  router.delete(
    "/api/users/:user_id/cancel-request-friendship",
    ...middlewares,
    async (req, res, next) => {
      try {
        const { user_id } = validationSchema.validateSync({
          user_id: req.params.user_id,
        });

        const userRepository = new UserRepository();

        const userExists = await userRepository.userWithIdExists(user_id);

        if (!userExists) {
          throw new UserNotFound({ user_id });
        }

        const friendshipRequestExist =
          await userRepository.friendshipRequestExists(req.user.id, user_id);

        if (!friendshipRequestExist) {
          throw new FriendshipRequestNotExistsYet();
        }

        await userRepository.deleteFriendshipRequest(req.user.id, user_id);

        return res.json({ message: "Friendship request deleted successfully" });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initCancelRequestFriendshipController;
