const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience.model");




  router.get('/country/:location/experience', (req, res, next) => {

    const {location} = req.params

    Experience.find({location: location})
      .then((allExperiences) => { 
        console.log(allExperiences);
        res.json(allExperiences)})
      .catch(err => res.json(err));
  });

  router.get('/country/:location/:experience_id', (req, res, next) => {
    const {experience_id} = req.params
    Experience.findById(experience_id)
      .then(experience_id => res.json(experience_id))
      .catch(err => res.json(err));
  });

  module.exports = router;
