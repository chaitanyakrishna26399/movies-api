const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  moviename: {
    type: String,
    required: true
  },
  hero: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
});


const movies = mongoose.model('Movies', movieSchema);

module.exports = movies;