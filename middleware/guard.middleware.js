// middleware/route-guard.js
const express = require('express');

// checks if the user loggedin is the same as the one is trying to acces to that user route
const isLoggedUser = (req, res, next) => {
    if (req.body.user?._id === req.params.userId) {
        return next()

    } else {
        res.status(500).send('Error your are not the owner');
    }

};

module.exports = {
    isLoggedUser,
};