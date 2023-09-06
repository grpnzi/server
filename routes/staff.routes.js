const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience.model");
const Staff = require("../models/Staff.model");


//STAFF DISPLAY

router.get('/staff', (req, res) => {
    Staff.find()
      .then((allStaff) => { 
        // Shuffle the array to randomize the order
        allStaff.sort(() => Math.random() - 0.5);
  
        // Get the first 3 elements (random)
        const randomStaff = allStaff.slice(0, 2);
  
        console.log(randomStaff);
        res.json(randomStaff); // Send the response inside this .then() block
      })
      .catch(err => res.json(err));
  });

module.exports = router;