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

module.exports = router;