const express = require("express");

const initGetUsersController = require("./getUsersController");
const initRequestFriendshipController = require("./requestFriendshipController");
const initCancelRequestFriendshipController = require("./cancelRequestFriendshipController");
const initAcceptFriendshipRequestController = require("./accessFriendshipRequestController");
const initRejectFriendshipRequestController = require("./rejectFriendshipRequestController");

const router = express.Router();

initGetUsersController(router);
initRequestFriendshipController(router);
initCancelRequestFriendshipController(router);
initAcceptFriendshipRequestController(router);
initRejectFriendshipRequestController(router);

module.exports = router;
