const express = require("express");
const initGetNotificationsController = require("./getNotificationsController");

const router = express.Router();

initGetNotificationsController(router);

module.exports = router;
