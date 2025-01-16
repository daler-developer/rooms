const passport = require("passport");
const UserRepository = require("../../repository/userRepository");

const middlewares = [passport.authenticate("local", { session: false })];

const initToggleFriendshipRequestsController = (router) => {
  router.post(
    "/api/profile/toggle-accept-friendship-requests",
    middlewares,
    async (req, res) => {
      const userRepository = new UserRepository();

      await userRepository.toggleAcceptFriendshipRequests(req.user.id);

      return res.json({ message: "toggled" });
    }
  );
};

module.exports = initToggleFriendshipRequestsController;
