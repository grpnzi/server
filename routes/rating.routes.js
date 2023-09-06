const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience.model");
const Rating = require("../models/Rating.model");

// Display Rating
router.get('/:experienceId/all', (req, res) => {
  const { experienceId } = req.params;

  Experience.findById(experienceId).populate('ratings')
    .then((updatedExperience) => {
      res.status(201).json({ message: 'Succes', updatedExperience });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error getting the experience with the ratings.' });
    });
});


// Create Rating
router.post('/:experienceId/create', (req, res) => {
  const { userId, ratingValue } = req.body;
  const { experienceId } = req.params;

  Rating.create({
    rating: ratingValue,
    author: userId,
  })
    .then((newRating) => {
      return Experience.findByIdAndUpdate(
        experienceId,
        { $addToSet: { ratings: newRating._id } },
        { new: true }
      );
    })
    .then((updatedExperience) => {
      res.status(201).json({ message: 'Review created and experience updated successfully', updatedExperience });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error creating the rating.' });
    });
});

module.exports = router;
