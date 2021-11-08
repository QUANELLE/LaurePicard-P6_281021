"use strict";

const Sauce = require("../models/SauceModel");
const fs = require("fs");
const { set } = require("mongoose");

// création d'une sauce
exports.createSauce = (req, res) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  delete sauceObjet._id;
  console.log(sauceObjet);
  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "sauce créée!" }))
    .catch((error) => res.status(400).json({ error }));
};

// fonction like/dislike
exports.createLikeSauce = (req, res) => {
  // à faire
  const userId = req.body.userId;
  console.log("=>userId");
  console.log(userId);
    // let like = req.body.like;
    // console.log("=>like");
    // console.log(like);
    const sauceId = req.params.id;
    console.log("=>sauceId");
    console.log(sauceId);

    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      
      const likesDislikes = {
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
        likes: 0,
        dislikes: 0
    }
    console.log("=>likesDislikes");
    console.log(likesDislikes);
    // usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
// qui ont aimé (= liked) la sauce
    let usersLikedRes = sauce.usersLiked;
    console.log("=usersLikedRes");
    console.log(usersLikedRes);
// transforme le tableau en Set
    let setUsersLiked = new Set(usersLikedRes);
    console.log("=setUsersLiked");
    console.log(setUsersLiked);


    // usersDisliked : [ "String <userId>" ] — tableau des identifiants des
// utilisateurs qui n'ont pas aimé (= disliked) la sauce
    let usersDislikedRes = sauce.usersDisliked;
    console.log("=usersDislikedRes");
    console.log(usersDislikedRes);
// transforme le tableau en Set    
    let setUsersDisliked = new Set(usersDislikedRes);
    console.log("=setUsersDisliked");
    console.log(setUsersDisliked);
  

    

    let like = req.body.like;
    console.log("=>like");
    console.log(like);

    switch (like) {
      // cas d'un like
      case 1:
      setUsersLiked.add(userId);
      break;
      case -1:
        setUsersDisliked.add(userId);
        break;
      case 0:
        if (setUsersLiked.has(userId)){

          setUsersLiked.delete(userId)
        }
else {
  setUsersDisliked.delete(userId)
}
        console.log("0");
        break;
        default:
          console.log("problème!");
    };

    // retransforme le Set en tableau
    const usersLiked = Array.from(new Set(setUsersLiked));
    console.log("=usersLiked");
    console.log(usersLiked);

  // retransforme le Set en tableau
  let usersDisliked = Array.from(new Set(setUsersDisliked));
  console.log("=usersDisliked");
  console.log(usersDisliked);

  // likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
  let likes = setUsersLiked.size;
  console.log("=likes");
  console.log(likes);

  // dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
// sauce
  let dislikes = setUsersDisliked.size;
  console.log("=dislikes");
  console.log(dislikes);


    console.log("=>usersLiked après switch");
    console.log(usersLiked);
    console.log("=>usersDisliked après switch");
    console.log(usersDisliked);
    console.log("=>likes après switch");
    console.log(likes);
    console.log("=dislikes après switch");
    console.log(dislikes);


    Sauce.updateOne(
      { _id: req.params.id },
      { ...likesDislikes, _id: req.params.id }
    )
      .then((sauce) => res.status(200).json({ message: "like/dislike enregistré", sauce }))
      .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));

};

// modifier une sauce
exports.modifySauce = (req, res) => {
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObjet = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          }
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObjet, _id: req.params.id }
          )
            .then((sauce) => res.status(200).json({ message: "sauce update", sauce }))
            .catch((error) => res.status(400).json({ error }));
        });
      });
  } else {
    const sauceObjet = { ...req.body };

    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObjet, _id: req.params.id }
    )
      .then((sauce) => res.status(200).json({ message: "sauce update", sauce }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// trouver une sauce
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id }, { ...req.body })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then((sauce) => res.status(200).json({ message: "sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));

  console.log(req.params.id);
};

//  afficher toutes les sauces
exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
