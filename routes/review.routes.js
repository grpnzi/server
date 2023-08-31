const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const Experience = require("../models/Experience.model");

// router.post('/places/:placeId/like', isLoggedIn, (req, res) => {
//     const placeId = req.params.placeId;
//     const userId = req.session.currentUser._id;
//     Place.findById(placeId)
//       .then((place) => {
//         if (!place) {
//           return res.status(404).send('Place not found');
//         }
//         if (place.likes.includes(userId)) {
//           return Place.updateOne({ _id: placeId }, { $pull: { likes: userId } });
//         } else {
//           return Place.updateOne({ _id: placeId }, { $addToSet: { likes: userId } });
//         }
//       })
//       .then(() => {
//         res.redirect("/places/" + placeId);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).send('Error processing request');
//       });
//   });


router.get('/reviews/:expererience_Id', (req, res, next) => {
    const { expererience_Id } = req.params
    Experience.findById(expererience_Id ).populate("reviews")
        .then((allReviews) => res.json(allReviews))
        .catch(err => res.json(err));
});

//  Create comment

router.post('/reviews/:expererience_Id', (req, res, next) => {
    const { comment, userId } = req.body
    const { expererience_Id } = req.params

    Review.create({
        comment,
        author: userId,
    })
        .then((newReview) => {
            Experience.findByIdAndUpdate(
                expererience_Id,
                { $addToSet: { reviews: newReview._id } }, // addToSet es lo mismo que un push pero limitado a 1 iteracion.
                { new: true } // This option returns the updated experience document
            )
                .then((updatedExperience) => {
                    res.json(updatedExperience);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Error updating experience with new review.' });
                });

        })
})


//Delete comment
router.post('/reviews/:expererience_Id/delete', (req, res, next) => {
    const { reviewId } = req.body
    const experience_id = req.params;
    Review.findByIdAndDelete(reviewId)
        .then(() => {
            Experience.findByIdAndUpdate(experience_id,
                { $pull: { reviews: reviewId } },
                { new: true } // This option returns the updated experience document
            )
                .then(allReviews => res.json(allReviews))
        })
        .catch(err => console.log('This error has been triggered', err))
});

//Modify comment
router.post('/reviews/:expererience_Id/modify', (req, res, next) => {
    const { comment, experience_id } = req.body
    const { expererience_Id } = req.params

    Review.findByIdAndUpdate(experience_id, {
        comment,
    })
        .then(() => {
            Review.find({ experience: expererience_Id })
            .then(allReviews => res.json(allReviews))
            .catch(err => res.json(err));
    })

        .catch(err => console.log('This error has been triggered', err))
});


module.exports = router;
