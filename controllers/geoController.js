const GeoData = require("../models/GeoData");

// Controller function to handle GET requests

// With ?lat=&lon= fetches live weather from OpenWeatherMap

// GET /api/geo-data

const getGeoData = async (req, res) => {
  try {
    // lets pull the query perams from the url
    const { lat, lon, location, startDate, endDate } = req.query;

    // First scenario - lat and lon provided and fetched from external API
    if (lat && lon) {
      const apiKey = process.env.WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      // fetch the data from the external API
      const response = await fetch(url);

      // if the API returned an error status forward the log
      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          message: `Weather API error: ${response.statusText}`,
        });
      }

      const data = await response.json();

      // return only the fields that we care about
      return res.status(200).json({
        success: true,
        data: {
          latitude: data.coord.lat,
          longitude: data.coord.lon,
          location: data.name,
          temperature: data.main.temp,
          conditions: data.weather[0].description,
          fetchedAt: new Date().toISOString(),
        },
      });
    }

    // Second scenario nolat/lon is provided. it is returned stored data from MongoDB

    // Build a filter object based on what the client sent

    const filter = {};

    // location filter
    if (location) {
      filter.location = new RegExp(location, "i");
    }

    // date range filter and use MongoDB operators $gte and $lte

    if (startDate || endDate) {
      filter.fetchedAt = {};
      if (startDate) filter.fetchedAt.$gte = new Date(startDate);
      if (endDate) filter.fetchedAt.$lte = new Date(endDate);
    }

    const geoData = await GeoData.find(filter);
    res.status(200).json({ success: true, data: geoData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// POST /api/geo-data
// Accepts geospatial data in the request body and saves it to mongodb
// returns a new documents _id

const createGeoData = async (req, res) => {
  try {
    // req.body to contain the JSON thats sent
    const geoData = await GeoData.create(req.body);

    // lets create a 201 success response
    res.status(201).json({
      success: true,
      message: "GeoData created",
      id: geoData._id,
      data: geoData,
    });
  } catch (error) {
    // lets create the bad request response
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/geo-data/:id
// retrieves a specoific entry based on the mongoDB _id

const getGeoDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const geoData = await GeoData.findById(id);

    // if no document was found by the id return a 404 not found response
    if (!geoData) {
      return res
        .status(404)
        .json({ success: false, message: "GeoData not found" });
    }

    res.status(200).json({ success: true, data: geoData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGeoData,
  createGeoData,
  getGeoDataById,
};
