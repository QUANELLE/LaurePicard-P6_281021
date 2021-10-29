"use strict";
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/SauceController');



router.post('/sauces', sauceCtrl.createSauce);
router.post('/sauces/:id/like', sauceCtrl.createLikeSauce);


router.get('/sauces',sauceCtrl.getAllSauces);
router.delete('/sauces/:id',sauceCtrl.deleteSauce);
router.put('/sauces/:id',sauceCtrl.modifySauce);
router.get('/sauces/:id',sauceCtrl.getOneSauce);

module.exports = router;