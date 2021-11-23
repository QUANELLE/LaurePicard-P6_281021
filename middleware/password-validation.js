const PasswordValidator = require("password-validator");

let schema = new PasswordValidator();

// propriétés à vérifier
schema
    .is().min(8)                                    // 8 caractères minimum
    .is().max(50)                                  //50 caractères maximum
    .has().uppercase()                              // Doit contenir au moins une majuscule
    .has().lowercase()                              // Doit contenir au moins une minusule
    .has().digits()                                // Doit contenir au moins un chiffre
    .has().not().spaces();                         // espaces interdits

module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)) {
        res.status(400).json(schema.validate(req.body.password, { details: true }));
    } else {
        next();
    }
};