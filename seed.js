const mongoose = require('mongoose');
const Experience = require('./models/Experience.model');

// we need the dotenv to access to the variables inside the .env file
require("dotenv").config();

const MONGO_URI ="mongodb+srv://Project3:Project3@cluster0.nhp3iwl.mongodb.net/Project3"

const newExperience = {
  title: "Husky Sledding and Northern Lights Expedition",
  location: 'FIN',
  experienceType: 'Xtreme',
  description: `Journey through the Arctic wilderness under the magical Northern Lights. Drive your own team of huskies through the snowy landscapes, guided only by the ethereal glow of the Aurora Borealis. This unique adventure combines the thrill of dog sledding with the wonder of the Northern Lights`,
  duration: '1 day',
  price: 450.00,
  imageUrl: 'https://www.visittromso.no/sites/cb_tromso/files/styles/article_slide_large/public/Banner%20husky.jpg?h=d2263936&itok=XhBkuvXU',
  tags: ['Husky Sledding', 'Northern Lights', 'Arctic Adventure'],
  ratings: [],
  reviews: []
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