"use strict";
const express = require("express");
const Router = express.Router();
const userCtrl = require("../controllers/UserController");
const auth = require("../middleware/auth");
const passwordValidation = require("../middleware/password-validation");
const emailValidation = require("../middleware/email-validation");

Router.post("/signup",emailValidation, passwordValidation,  userCtrl.signup);
Router.post("/login", userCtrl.login);

module.exports = Router;
