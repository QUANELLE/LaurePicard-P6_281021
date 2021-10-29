"use strict";
const Sauce = require('../models/SauceModel');

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'sauce créée!' }))
    .catch(error => res.status(400).json({ error }));
  next();
};

exports.createLikeSauce = (req, res, next) => {
  // à faire
};

exports.modifySauce = (req, res, next) => {

  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(sauce => res.status(200).json({ message: 'sauce update' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {

  Sauce.findOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {

  Sauce.delete({ _id: req.params.id })
    .then(sauce => res.status(200).json({ message: 'sauce supprimée' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  console.log('getAllSauces ok');
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};