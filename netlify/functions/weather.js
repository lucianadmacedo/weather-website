// Netlify serverless function to proxy OpenWeatherMap API
// This keeps your API key secret on the server

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Get API key from environment variable (set in Netlify dashboard)
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get query parameters from the request
    const { lat, lon, q } = event.queryStringParameters || {};

    // Build OpenWeatherMap API URL
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    if (lat && lon) {
      // Search by coordinates
      apiUrl += `lat=${lat}&lon=${lon}`;
    } else if (q) {
      // Search by city name
      apiUrl += `q=${encodeURIComponent(q)}`;
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters: lat & lon OR q (city name)' })
      };
    }

    // Add API key
    apiUrl += `&appid=${API_KEY}`;

    // Fetch weather data from OpenWeatherMap
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Return the weather data
    return {
      statusCode: response.ok ? 200 : response.status,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch weather data',
        message: error.message
      })
    };
  }
};
