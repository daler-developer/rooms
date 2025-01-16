const express = require("express");
const initToggleFriendshipRequestsController = require("./toggleAcceptFriendshipRequestsController");
const initResetPasswordControllerController = require("./resetPasswordController");
const initGetProfileController = require("./getprofileController");
const initGetFrintshipRequestsController = require("./getFriendshipRequestsController");

const router = express.Router();

initToggleFriendshipRequestsController(router);
initResetPasswordControllerController(router);
initGetProfileController(router);
initGetFrintshipRequestsController(router);

module.exports = router;
