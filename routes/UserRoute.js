"use strict";
const express = require("express");
const Router = express.Router();
const userCtrl = require("../controllers/UserController");
const auth = require("../middleware/auth");

Router.post("/signup", userCtrl.signup);
Router.post("/login", userCtrl.login);

module.exports = Router;
