const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const Experience = require("../models/Experience.model");


router.post('/reviews/like', (req, res) => {
    const { userId, reviewId } = req.body;
    let updateQuery;

    Review.findById(reviewId)
        .then((review) => {
            if (!review) {
                return res.status(404).send('Review not found');
            }

            if (review.likes.includes(userId)) {
                updateQuery = { $pull: { likes: userId } };
            } else {
                updateQuery = { $addToSet: { likes: userId } };
            }

            Review.updateOne({ _id: reviewId }, updateQuery)
                .then(() => {
                    res.status(200).send('Operation like successful');
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send('Error updating review');
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error processing request');
        });
});

//Modify comment
router.post('/reviews/edit', (req, res, next) => {
    const { comment, reviewId } = req.body

    Review.findByIdAndUpdate(reviewId, {
        comment
    }, { new: true })
        .then((updatedReview) => {
            res.status(201).json({ message: 'Comment updated succesfull', updatedReview });
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

});

//Get all the reviews
router.get('/reviews/:experience_Id', (req, res, next) => {
    const { experience_Id } = req.params;
    Experience.findById(experience_Id).populate([
        {
            path: 'reviews',
            model: 'Review',
            populate: {
                path: 'author',
                model: 'User',
                select: 'name',
            }
        },
    ])
        .then((allReviews) => {
            console.log('All Reviews:', allReviews);
            res.json(allReviews);
        })
        .catch((err) => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        })
});

//  Create comment

router.post('/reviews/:experience_Id', (req, res, next) => {
    const { comment, userId } = req.body;
    const { experience_Id } = req.params;

    Review.create({
        comment,
        author: userId,
    })
        .then((newReview) => {
            return Experience.findByIdAndUpdate(
                experience_Id,
                { $addToSet: { reviews: newReview._id } },
                { new: true }
            );
        })
        .then((updatedExperience) => {
            res.status(201).json({ message: 'Review created and experience updated successfully', updatedExperience });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error updating experience with new review.' });
        });
});

//Delete comment
router.post('/reviews/:experience_id/delete', (req, res, next) => {
    const { reviewId } = req.body;
    const { experience_id } = req.params; // Correctly extract experience_id
    Review.findByIdAndDelete(reviewId)
        .then(() => {
            Experience.findByIdAndUpdate(
                experience_id,
                { $pull: { reviews: reviewId } },
                { new: true } // This option returns the updated experience document
            )
                .then(allReviews => res.json(allReviews))
                .catch(err => {
                    console.error('Error:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});



module.exports = router;
