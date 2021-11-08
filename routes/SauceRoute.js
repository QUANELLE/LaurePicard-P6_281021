"use strict";

const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/SauceController");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/",auth,multer, sauceCtrl.createSauce);
router.post("/:id/like", sauceCtrl.createLikeSauce);


router.get("/", sauceCtrl.getAllSauces);
router.delete("/:id",auth, sauceCtrl.deleteSauce);
router.put("/:id",auth,multer, sauceCtrl.modifySauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);

module.exports = router;
