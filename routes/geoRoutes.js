// This file maps url to controller functions
// router is mounted at api/geo-data in server.js file

const express = require("express");
const router = express.Router();

// lets import the controller function

const {
  getGeoData,
  createGeoData,
  getGeoDataById,
} = require("../controllers/geoController");

// GET /api/geo-data
router.get("/", getGeoData);

// POST /api/geo-data
// Saves. the request body to mongoDB
router.post("/", createGeoData);

// GET /api/geo-data/:id
// Returns a stored entry bys its mongoDB _id

router.get("/:id", getGeoDataById);

module.exports = router;
