const mongoose = require("mongoose");

const geoDataSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
      min: -90,
      max: 90,
    },

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
      type: Number,
    },

    conditions: {
      type: String,
      trim: true,
    },

    fetchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  // hides the __v field
  { versionKey: false },
);
