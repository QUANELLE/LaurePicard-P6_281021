"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");


let userSchema = mongoose.Schema({
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
