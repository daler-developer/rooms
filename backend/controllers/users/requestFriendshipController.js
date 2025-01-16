const yup = require("yup");
const passport = require("passport");
const UserRepository = require("../../repository/userRepository");
const { UserNotFound, FriendshipAlreadyExists } = require("../../errors/users");

const middlewares = [passport.authenticate("jwt", { session: false })];

const validationSchema = yup.object({
  user_id: yup.number().required(),
});

const initRequestFriendshipController = (router) => {
  router.post(
    "/api/users/:user_id/request-friendship",
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

        const alreadyExists = await userRepository.friendshipRequestExists(
          req.user.id,
          user_id
        );

        if (alreadyExists) {
          throw new FriendshipAlreadyExists();
        }

        await userRepository.createFriendshipRequest(req.user.id, user_id);

        return res.json({ message: "Friendship created successfully" });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initRequestFriendshipController;
