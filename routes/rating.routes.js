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

  const existingRating = Rating.findOne({ author: userId, experience: experienceId });

  if (existingRating) {
    // You can return an error or handle this case as needed
    return res.status(400).send({ error: 'User has already rated this experience' });
  }

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
      res.status(201).json({ message: 'Rating created and experience updated successfully', updatedExperience });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error creating the rating.' });
    });
});

module.exports = router;
