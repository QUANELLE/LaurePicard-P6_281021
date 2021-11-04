"use strict";

const Sauce = require("../models/SauceModel");
const fs = require('fs');

exports.createSauce = (req, res) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  delete sauceObjet._id;
console.log(sauceObjet);
  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  });
  sauce.save()
  .then(() => res.status(201).json({ message: "sauce créée!" }))
  .catch((error) => res.status(400).json({ error }));
};

exports.createLikeSauce = (req, res) => {
  // à faire
};

exports.modifySauce = (req, res) => {
  const sauceObjet = req.file?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  } : {...req.body};
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
    .then((sauce) => res.status(200).json({ message: "sauce update",sauce }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {

  Sauce.findOne({ _id: req.params.id }, { ...req.body })
    .then(sauce => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res,next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce)=>{
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`,()=> {
      Sauce.deleteOne({ _id: req.params.id })
  .then(sauce => res.status(200).json({ message: "sauce supprimée" }))
  .catch((error) => res.status(400).json({ error }));
    } )
  })
  .catch((error) => res.status(500).json({ error }))
    
  console.log(req.params.id);
};

exports.getAllSauces = (req, res) => {
  
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};