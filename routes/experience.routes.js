const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience.model");


router.get("/country",(res,req)=>{

    res.Json("")
})


  router.get('/country/experience', (req, res, next) => {
    Experience.find()
      .then(allExperiences => res.json(allExperiences))
      .catch(err => res.json(err));
  });

  router.get('/country/experience/:experience_id', (req, res, next) => {
    const {experience_id} = req.params
    Experience.findById(experience_id)
      .then(experience_id => res.json(experience_id))
      .catch(err => res.json(err));
  });