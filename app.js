// OpenWeatherMap API Configuration
const API_KEY = '42b14313ead9beeb67c25fd77291a879'; // Replace with your API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const citySearchInput = document.getElementById('city-search');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');
const weatherDisplay = document.getElementById('weather-display');

// Weather data elements
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentCelsius = document.getElementById('current-celsius');
const currentFahrenheit = document.getElementById('current-fahrenheit');
const feelsCelsius = document.getElementById('feels-celsius');
const feelsFahrenheit = document.getElementById('feels-fahrenheit');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');

// Temperature Conversion Functions
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Weather Icon Mapping
function getWeatherIcon(condition) {
    const icons = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'smoke': '💨',
        'haze': '🌫️',
        'fog': '🌫️',
        'dust': '💨',
        'sand': '💨',
        'ash': '💨',
        'squall': '💨',
        'tornado': '🌪️'
    };
    return icons[condition.toLowerCase()] || '🌤️';
}

// Update Background Based on Weather
function updateBackground(condition) {
    const body = document.body;
    // Remove all weather classes
    body.className = '';
    // Add new weather class
    body.classList.add(condition.toLowerCase());
}

// Show Error Message
function showError(message) {
    errorMessage.querySelector('.error-text').textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Show/Hide Loading
function setLoading(isLoading) {
    if (isLoading) {
        loading.classList.remove('hidden');
        weatherDisplay.classList.add('hidden');
    } else {
        loading.classList.add('hidden');
        weatherDisplay.classList.remove('hidden');
    }
}

// Update Weather Display
function updateWeatherDisplay(data) {
    // City name
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    // Weather icon and description
    const condition = data.weather[0].main;
    weatherIcon.textContent = getWeatherIcon(condition);
    weatherDescription.textContent = data.weather[0].description;

    // Update background
    updateBackground(condition);

    // Current temperature
    const tempC = kelvinToCelsius(data.main.temp);
    const tempF = celsiusToFahrenheit(tempC);
    currentCelsius.textContent = `${Math.round(tempC)}°`;
    currentFahrenheit.textContent = `${Math.round(tempF)}°`;

    // Feels like temperature
    const feelsC = kelvinToCelsius(data.main.feels_like);
    const feelsF = celsiusToFahrenheit(feelsC);
    feelsCelsius.textContent = `${Math.round(feelsC)}°`;
    feelsFahrenheit.textContent = `${Math.round(feelsF)}°`;

    // Additional info
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    // Show weather display
    setLoading(false);
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        setLoading(true);
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }

        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherDisplay(data);
        } else {
            throw new Error(data.message || 'Unable to fetch weather data');
        }
    } catch (error) {
        setLoading(false);
        showError(error.message);
    }
}

// Fetch Weather by City Name
async function fetchWeatherByCity(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }

    try {
        setLoading(true);
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherDisplay(data);
            citySearchInput.value = '';
        } else {
            throw new Error(data.message || 'City not found');
        }
    } catch (error) {
        setLoading(false);
        showError(error.message);
    }
}

// Get Current Location Weather
function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
            setLoading(false);
            let errorMessage = 'Unable to get your location';

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please enable location permissions.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out';
                    break;
            }

            showError(errorMessage);
        }
    );
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = citySearchInput.value;
    fetchWeatherByCity(city);
});

citySearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = citySearchInput.value;
        fetchWeatherByCity(city);
    }
});

locationBtn.addEventListener('click', () => {
    getCurrentLocationWeather();
});

// Initialize: Get current location weather on page load
window.addEventListener('load', () => {
    getCurrentLocationWeather();
});
