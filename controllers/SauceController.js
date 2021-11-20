"use strict";

let Sauce = require("../models/SauceModel");
let fs = require("fs");

// création d'une sauce
exports.createSauce = (req, res) => {
  let sauceObjet = JSON.parse(req.body.sauce);
  delete sauceObjet._id;
  let sauce = new Sauce({
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
  let userId = req.body.userId;
  let sauceId = req.params.id;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let likesDislikes = {
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
        likes: sauce.likes,
        dislikes: sauce.dislikes,
      };
      // transforme le tableau [usersLiked] en Set
      let setUsersLiked = new Set(likesDislikes.usersLiked);

      // transforme le tableau [usersDisliked] en Set
      let setUsersDisliked = new Set(likesDislikes.usersDisliked);

      // valeur de retour du like
      let like = req.body.like;
      // traitement des différentes valeurs possibles du like
      switch (like) {
        // cas d'un like
        case 1:
          setUsersLiked.add(userId);
          break;
        // cas d'un dislike
        case -1:
          setUsersDisliked.add(userId);
          break;
        // suppression du like OU du dislike
        case 0:
          if (setUsersLiked.has(userId)) {
            setUsersLiked.delete(userId);
          } else {
            setUsersDisliked.delete(userId);
          }
          break;
        default:
          console.log("erreur enregistrement like/dislike");
      }

      // retransforme le Set en tableau [usersLiked]
      likesDislikes.usersLiked = Array.from(new Set(setUsersLiked));

      // retransforme le Set en tableau [usersDisliked]
      likesDislikes.usersDisliked = Array.from(new Set(setUsersDisliked));

      // likes :nombre d'utilisateurs qui aiment la sauce
      likesDislikes.likes = setUsersLiked.size;

      // dislikes :nombre d'utilisateurs qui n'aiment pas la sauce
      likesDislikes.dislikes = setUsersDisliked.size;

      // mise à jour des nouvelles valeurs de like/dislike
      Sauce.updateOne(
        { _id: req.params.id },
        { ...likesDislikes, _id: req.params.id }
      )
        .then((sauce) =>
          res.status(200).json({ message: "like/dislike enregistré", sauce })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

// modifier une sauce
exports.modifySauce = (req, res) => {
  // cas de changement d'image
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // suppression du fichier image précédent
      let filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        let sauceObjet = {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
            }`,
        };
        // prise en compte des nouveaux paramêtres de la sauce
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObjet, _id: req.params.id }
        )
          .then((sauce) =>
            res.status(200).json({ message: "sauce update", sauce })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    });
  } else {
    // mise à jour de la sauce SANS changement d'image
    let sauceObjet = { ...req.body };
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
      let filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then((sauce) => res.status(204).json({ message: "sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

//  afficher toutes les sauces
exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
