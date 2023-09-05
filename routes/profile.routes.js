const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("./../models/User.model");
const { /* isAuthenticated */ } = require("../middleware/jwt.middleware");

// EDIT USER
router.post("/profile/edit/:userId", /* isAuthenticated */ (req, res) => {
  const userId = req.params.userId;
  const { email, password, name } = req.body;
  User.findByIdAndUpdate(userId, { email, password, name }, {new: true})
    .then((modifiedUser) => {
      res.json(modifiedUser);
    })
    .catch((error) => {
      console.error(error);
      res.send(error, "Error updating data");
    });
});

// DELETE USER
router.post("/profile/delete/:userId", /* isAuthenticated */ (req, res) => {
  const userId = req.params.userId;
  const { email, password, name } = req.body;
  User.findByIdAndRemove(userId, { email, password, name })
  .then((deletedUser) => {
    res.json(deletedUser);
  })
    .catch((error) => {
      console.error(error);
      res.send(error, "Error deleting data");
    });
});

module.exports = router;
