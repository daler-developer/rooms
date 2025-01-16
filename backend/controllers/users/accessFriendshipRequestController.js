const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const { FriendshipRequestNotExistsYet } = require("../../errors/users");

const middlewares = [passport.authenticate("jwt", { session: false })];

const validationSchema = yup.object({
  user_id: yup.number().required(),
});

const initAcceptFriendshipRequestController = (router) => {
  router.post(
    "/api/users/:user_id/accept-friendship-request",
    ...middlewares,
    async (req, res, next) => {
      try {
        const { user_id } = validationSchema.validateSync({
          user_id: req.params.user_id,
        });

        const userRepository = new UserRepository();

        const friendshipRequestExists =
          await userRepository.friendshipRequestExists(user_id, req.user.id);

        if (!friendshipRequestExists) {
          throw new FriendshipRequestNotExistsYet();
        }

        await userRepository.createFriendship(req.user.id, user_id);
        await userRepository.deleteFriendshipRequest(user_id, req.user.id);
        await userRepository.incrementUserNumFriends(req.user.id);
        await userRepository.incrementUserNumFriends(user_id);

        return res.json({ message: "Friendship accepted" });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initAcceptFriendshipRequestController;
