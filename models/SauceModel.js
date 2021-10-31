"use strict";
const mongoose = require('mongoose');


const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min:1, max:10 },
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: Array},
  usersDislikes: { type: Array}
});

module.exports = mongoose.model('Sauce', sauceSchema);