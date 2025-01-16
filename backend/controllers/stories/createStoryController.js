const yup = require("yup");
const passport = require("passport");
const validateMiddleware = require("../../middleware/validateMiddleware");

const bodyValidationSchema = yup.object({});

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  validateMiddleware("body", bodyValidationSchema),
];

const initResetPasswordControllerController = (router) => {
  router.post("/api/stories", middlewares, async (req, res, next) => {
    try {
    } catch (e) {
      return next(e);
    }
  });
};

module.exports = initResetPasswordControllerController;
