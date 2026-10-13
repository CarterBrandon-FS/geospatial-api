// This file defines the shape of the data we store in MongoDB

const mongoose = require("mongoose");

// Lets set up the schema for our data in MongoDB

// lets put what type each field is the documents it can have and which is required
const geoDataSchema = new mongoose.Schema(
  {
    //   lets use real lat positioning for the min max of lat -90 - 90
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],

      min: -90,
      max: 90,
    },

    // lets use real lon positioning for the min amx of lon -180 - 180
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
      min: -180,
      max: 180,
    },
    // other fields...

    location: {
      type: String,
      trim: true,
    },

    temperature: {
      // Temperature in fahrenheit
      type: Number,
    },

    conditions: {
      // like clear sky or cloudy
      type: String,
      trim: true,
    },

    fetchedAt: {
      // Timestamp of when data is saved
      type: Date,
      default: Date.now,
    },
  },
  // hides the __v field automatically
  { versionKey: false },
);

module.exports = mongoose.model("GeoData", geoDataSchema);
