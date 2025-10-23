# Weather Website

A beautiful, responsive weather website that displays current temperature and "feels like" temperature in both Celsius and Fahrenheit, side-by-side.

## Features

✅ **Dual Temperature Display** - Celsius and Fahrenheit shown side-by-side for instant comparison
✅ **Real Feel Temperature** - "Feels like" temps in both units
✅ **Auto Location Detection** - Automatically shows weather for your current location
✅ **City Search** - Search for any city worldwide
✅ **Dynamic Backgrounds** - Background color changes based on weather conditions
✅ **Weather Icons** - Visual weather indicators
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
✅ **Additional Info** - Humidity, wind speed, and atmospheric pressure

## Live Demo

**🌐 Live Site:** https://lucianadmacedo.github.io/weather-website/

## Setup Instructions

### 1. Get Your Free API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Go to [API Keys](https://home.openweathermap.org/api_keys)
4. Copy your API key

### 2. Add API Key to the Website

1. Open `app.js`
2. Find line 2:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
   ```
4. Save the file

### 3. Test Locally

Simply open `index.html` in your web browser. That's it!

Or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## Deploy to GitHub Pages

### Method 1: Quick Deploy (Recommended)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `weather-website`
   - Make it public
   - Click "Create repository"

2. **Initialize and push your code:**
   ```bash
   cd /Users/lucianadiasdemacedo/weather-website
   git init
   git add .
   git commit -m "Initial commit: Weather website with dual temperature display"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/weather-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Under "Source", select: **main** branch and **/ (root)** folder
   - Click "Save"
   - Wait 1-2 minutes

4. **Your live site will be at:**
   ```
   https://YOUR_USERNAME.github.io/weather-website/
   ```

### Method 2: Using Existing Account

If you want to add it to your existing `lucianadmacedo` account:

```bash
cd /Users/lucianadiasdemacedo/weather-website
git init
git add .
git commit -m "Add weather website with dual temperature display"
git branch -M main
git remote add origin https://github.com/lucianadmacedo/weather-website.git
git push -u origin main
```

Then enable GitHub Pages in the repository settings.

## How It Works

### Temperature Conversion

```javascript
// Kelvin to Celsius
celsius = kelvin - 273.15

// Celsius to Fahrenheit
fahrenheit = (celsius × 9/5) + 32
```

### Location Detection

The website uses the browser's Geolocation API to automatically detect your location and fetch weather data.

### Weather API

Uses OpenWeatherMap API:
- **By Coordinates:** For current location
- **By City:** For city search

### Dynamic Backgrounds

Background colors change based on weather:

| Weather | Background Color |
|---------|-----------------|
| Clear/Sunny | Blue gradient |
| Cloudy | Gray gradient |
| Rain/Drizzle | Dark blue |
| Thunderstorm | Dark gray |
| Snow | Light blue/white |
| Fog/Mist | Gray |

## File Structure

```
weather-website/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── app.js             # JavaScript logic
└── README.md          # This file
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Customization

### Change Colors

Edit `style.css` to change the background gradients:

```css
body.clear {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Add More Weather Data

The API provides additional data you can display:
- Min/Max temperature
- Visibility
- Cloud coverage
- Sunrise/Sunset times

Add them by accessing the `data` object in `app.js`.

## Troubleshooting

### "Unable to fetch weather data"
- Verify your API key is correct
- Wait 5-10 minutes for API key activation
- Check your internet connection

### "Location access denied"
- Enable location permissions in your browser
- Or manually search for a city

### "City not found"
- Check spelling
- Try a different city name format (e.g., "New York" or "London")

## Privacy

- This website does not store any personal data
- Location is only used to fetch weather information
- No cookies or tracking

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: Emoji
- Design: Custom responsive design

## License

MIT License - Free to use and modify

---

Made with ❤️ using HTML, CSS, and vanilla JavaScript
