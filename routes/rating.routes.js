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

  Experience.findOne({ _id: experienceId }).populate('ratings')
    .then((existingExperience) => {
      if (!existingExperience) {
        return res.status(404).json({ error: 'Experience not found' });
      }
      const ratings = existingExperience.ratings;

      for (const e of ratings) {
        const authorString = e.author.toString();

        if (authorString === userId) {
          return res.status(400).json({ error: 'You have already rated this experience' });
        }
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
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error creating the rating.' });
    });

});

module.exports = router;
