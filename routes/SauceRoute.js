"use strict";

const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/SauceController");
const auth = require("../middleware/auth");

router.post("/",auth, sauceCtrl.createSauce);
router.post("/:id/like",auth, sauceCtrl.createLikeSauce);


router.get("/",auth, sauceCtrl.getAllSauces);
router.delete("/:id",auth, sauceCtrl.deleteSauce);
router.put("/:id",auth, sauceCtrl.modifySauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);

module.exports = router;
