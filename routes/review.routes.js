const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Review = require("../models/Review.model");

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
    const {expererience_Id} = req.params
    Review.find({experience: expererience_Id })
        .then(allReviews => res.json(allReviews))
        .catch(err => res.json(err));
});

// Create comment

// router.post('/reviews/:expererience_Id', (req, res, next) => {
//     const { comment, userId } = req.body
//     const {expererience_Id} = req.params

//     Review.create({
//         comment,
//         author,
//     })
//     .then(
//     Experience.findByIdAndUpdate(expererience_Id,$push:{Review:data._id}))


// })
    

//Delete comment
router.post('/country/:location/:experience_id', (req, res, next) => {

    const experience_id = req.params;
    Review.findByIdAndDelete(experience_id)
        .then(() => {
            Review.find()
                .then(allReviews => res.json(allReviews))
        })
        .catch(err => console.log('This error has been triggered', err))
});

//Modify comment
router.post('/country/:location/:experience_id', (req, res, next) => {
    const { comment, experience_id } = req.body

    Review.findByIdAndUpdate(experience_id, {
        comment: comment,
    })
        .then(() => {
            Review.find()
                .then(allReviews => res.json(allReviews))
        })

        .catch(err => console.log('This error has been triggered', err))
});


module.exports = router;
