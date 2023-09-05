const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience.model");

  // CREATE EXPERIENCE

router.post('/create', (req, res) => {
  const {
    title,
    location,
    experienceType,
    description,
    duration,
    price,
    imageUrl,
    tags,
    ratings,
    reviews
  } = req.body;

 
  const newExperience = {title,location,experienceType,description,duration,price,imageUrl,tags,ratings,reviews};

  Experience.create(newExperience)
    .then((createdExperience) => {
      res.status(201).json({ message: 'Experience created successfully', createdExperience });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error creating experience' });
    });
});



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



// EDIT EXPERIENCE
router.post('/experience/edit/:experienceId', (req, res) => {
  const experienceId = req.params.experienceId;
  const {
    title,
    location,
    experienceType,
    description,
    duration,
    price,
    imageURL,
    tags,
    ratings,
    reviews
  } = req.body;

  const updatedExperience = {
    title,
    location,
    experienceType,
    description,
    duration,
    price,
    imageURL,
    tags,
    ratings,
    reviews
  };


  Experience.findByIdAndUpdate(experienceId, updatedExperience, { new: true })
    .then((modifiedExperience) => {
      res.json(modifiedExperience);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error updating experience' });
    });
});

//DELETE EXPERIENCE

router.post("/experience/delete/:experienceId", (req, res) => {
  const experienceId = req.params.experienceId;

  Experience.findByIdAndRemove(experienceId)
    .then((deletedExperience) => {
      if (deletedExperience) {
        res.json({ message: "Experience deleted successfully" });
      } else {
        res.status(404).json({ error: "Experience not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error deleting experience" });
    });
});

module.exports = router;








