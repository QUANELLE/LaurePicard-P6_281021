"use strict";
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/SauceController');



router.post('/', sauceCtrl.createSauce);
router.post('/:id/like', sauceCtrl.createLikeSauce);


router.get('/',sauceCtrl.getAllSauces);
router.delete('/:id',sauceCtrl.deleteSauce);
router.put('/:id',sauceCtrl.modifySauce);
router.get('/:id',sauceCtrl.getOneSauce);

module.exports = router;