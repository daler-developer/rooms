const passport = require("passport");
const yup = require("yup");
const UserRepository = require("../../repository/userRepository");
const validateMiddleware = require("../../middleware/validateMiddleware");

const queryValidationSchema = yup.object({
  offset: yup.number().optional().min(0),
});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("query", queryValidationSchema),
];

const initGetFrintshipRequestsController = (router) => {
  router.get(
    "/api/profile/friendship-requests",
    middlewares,
    async (req, res, next) => {
      try {
        const userRepository = new UserRepository();

        const friendshipRequests = await userRepository.getFriendshipRequests(
          req.user.id,
          {
            offset: req.query.offset,
          }
        );

        return res.json({ friendship_requests: friendshipRequests });
      } catch (e) {
        return next(e);
      }
    }
  );
};

module.exports = initGetFrintshipRequestsController;
