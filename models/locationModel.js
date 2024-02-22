const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  lat: String,
  lon: String,
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
