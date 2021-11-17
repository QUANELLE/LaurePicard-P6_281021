// const { check, validationResult } = require('express-validator');
const validator = require("validator");
// import isEmail from 'validator/lib/isEmail';


module.exports = (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    console.log(validator.isEmail("email"));
    if (validator.isEmail("email")) {
        
        next();
    }
    else {
    res.status(400).json({message:"erreur email invalide"});
}};
