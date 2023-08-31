const mongoose = require('mongoose');
const Experience = require('./Experience.model');

// we need the dotenv to access to the variables inside the .env file
require("dotenv").config();

const MONGO_URI ="mongodb+srv://Project3:Project3@cluster0.nhp3iwl.mongodb.net/Project3"

const newExperience ={
    title: 'Amazing Adventure',
    location: 'Mountain Range',
    experienceType: 'Xtreme',
    description: 'Embark on an amazing adventure in the mountain range...',
    duration: '3 days',
    price: 199.99,
    imageUrl: 'https://example.com/image.jpg',
    tags: ['Adventure', 'Outdoor'],
    ratings:"64eefe705cce590d2740e3d8",
    reviews:'64eefe705cce590d2740e3d8'
  };

mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the books collection
    return Experience.create(newExperience);
  })
  .then(booksFromDB => {
    console.log(`Created ${booksFromDB.length} books`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating books from the DB: ${err}`);
  });