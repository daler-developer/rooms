const express = require("express");
const initLoginController = require("./loginController");
const initCheckUsernameController = require("./checkUsernameController");
const initRegisterController = require("./registerController");
const initGetProfileController = require("./getProfileController");

const router = new express.Router();

initLoginController(router);
initCheckUsernameController(router);
initRegisterController(router);
initGetProfileController(router);

module.exports = router;
