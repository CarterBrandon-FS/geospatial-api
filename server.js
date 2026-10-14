require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/database");

const PORT = process.env.PORT || 3000;

// Connect to mongodb
connectDB();
console.log("Server starting up");

// Middleware to parse json
app.use(express.json());

// Routes
const geoRoutes = require("./routes/geoRoutes");
app.use("/api/geo-data", geoRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// End server
