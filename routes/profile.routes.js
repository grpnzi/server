const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { isLoggedUser } = require('./../middleware/guard.middleware.js');
const User = require("./../models/User.model");

// EDIT USER
router.post("/profile/edit/:userId", isLoggedUser, (req, res) => {
  const userId = req.params.userId;
  const { email, img, name } = req.body;
  User.findByIdAndUpdate(userId, { email, img, name }, { new: true })
    .then((modifiedUser) => {
      const { _id, email, name, img, admin } = modifiedUser;
      // Create an object that will be set as the token payload
      const payload = { _id, email, name, img, admin };

      // Create a JSON Web Token and sign it
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      res.json({authToken, payload});
    })
    .catch((error) => {
      console.error(error);
      res.send(error, "Error updating data");
    });
});

// DELETE USER
router.post("/profile/delete/:userId", isLoggedUser, (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndRemove(userId)
    .then(() => {
      Reviews.findByIdAndRemove()
    })
    .catch((error) => {
      console.error(error);
      res.send(error, "Error deleting data");
    });
});

module.exports = router;
