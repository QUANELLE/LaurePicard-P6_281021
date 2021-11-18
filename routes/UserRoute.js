"use strict";
const express = require("express");
const Router = express.Router();
const userCtrl = require("../controllers/UserController");
const auth = require("../middleware/auth");
const passwordValidation = require("../middleware/password-validation");

Router.post("/signup", passwordValidation,  userCtrl.signup);
Router.post("/login", userCtrl.login);

module.exports = Router;
