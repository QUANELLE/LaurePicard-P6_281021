"use strict";

const express = require("express");
const Router = express.Router();
const sauceCtrl = require("../controllers/SauceController");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

Router.post("/", auth, multer, sauceCtrl.createSauce);
Router.post("/:id/like", auth, sauceCtrl.createLikeSauce);

Router.get("/", auth, sauceCtrl.getAllSauces);
Router.delete("/:id", auth, sauceCtrl.deleteSauce);
Router.put("/:id", auth, multer, sauceCtrl.modifySauce);
Router.get("/:id", auth, sauceCtrl.getOneSauce);

module.exports = Router;
