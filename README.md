# Geospatial API

A Node.js + Express API that fetches geospatial weather data from OpenWeatherMap and stores it in MongoDB.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- OpenWeatherMap API
- dotenv

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file in the project root with:

- `MONGODB_URI` - the uri to your

## Brandon Carter

## API Used

**OpenWeatherMap — Current Weather Data**

- Homepage: https://openweathermap.org
- Documentation: https://openweathermap.org/current
- API key signup: https://openweathermap.org/api
- Requires a free API key. New keys may take up to 2 hours to activate.

Example call:

GET /api/geo-data?lat=31.5791&lon=-90.4407

4. Make sure MongoDB is running locally:

   brew services start mongodb-community@7.0

5. Start the server:

   npm run dev

You should see:

Server is running on port 3000
MongoDB Connected: 127.0.0.1
