const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models.User.model");
const {isAuthenticated} = require("../middleware/jwt.middleware")

router.get("/profile/edit", (req, res, next) => {

    res.json("All good in here");
  });
  
  module.exports = router;
