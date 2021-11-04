"use strict";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("==>token");
    console.log(token);
    const decodedToken = jwt.verify(token, `${process.env.RANDOM_TOKEN_SECRET}`);
    console.log("==>decodedToken");
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log("==>userId");
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw "utilisateur non valable";
    } else {
      next();
    }
  } catch(err) {
    res.status(401).json({
      error: err|"requête invalide"
    });
  }
};