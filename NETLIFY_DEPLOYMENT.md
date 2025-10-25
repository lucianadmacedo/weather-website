# Deploying to Netlify with Secure API Key

This guide will help you deploy your weather website to Netlify with a secure backend that keeps your API key hidden.

## What We Built

✅ **Serverless Function** - A backend proxy that calls OpenWeatherMap API
✅ **Secure** - Your API key stays on the server, never visible in browser
✅ **Updated Frontend** - app.js now calls YOUR server instead of OpenWeatherMap directly

## Files Created

- `netlify/functions/weather.js` - Serverless function (backend proxy)
- `netlify.toml` - Netlify configuration
- `package.json` - Dependencies for serverless function
- `.gitignore` - Prevents committing sensitive files

## Step-by-Step Deployment

### 1. Commit Your Code to GitHub

```bash
cd ~/weather-website
git add .
git commit -m "Add secure Netlify serverless function for API proxy"
git push
```

### 2. Sign Up for Netlify (Free)

1. Go to: https://www.netlify.com/
2. Click "Sign up" → Choose "Sign up with GitHub"
3. Authorize Netlify to access your GitHub

### 3. Deploy Your Site

1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Select your repository: `weather-website`
4. Netlify will auto-detect the settings:
   - **Build command:** (leave empty)
   - **Publish directory:** (leave as `.`)
   - **Functions directory:** `netlify/functions` (should auto-detect)
5. Click "Deploy site"

### 4. Add Your API Key as Environment Variable

**IMPORTANT:** This keeps your key secure!

1. Go to your site's dashboard on Netlify
2. Click "Site settings" → "Environment variables"
3. Click "Add a variable"
4. Enter:
   - **Key:** `OPENWEATHER_API_KEY`
   - **Value:** Your OpenWeatherMap API key: `42b14313ead9beeb67c25fd77291a879`
5. Click "Create variable"

### 5. Redeploy

1. Go to "Deploys" tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait 1-2 minutes for deployment

### 6. Test Your Site

Your site will be live at: `https://YOUR-SITE-NAME.netlify.app`

Try:
- Click the location button to get your current weather
- Search for a city
- Check browser DevTools → Network tab → You'll see calls to `/.netlify/functions/weather` (NOT OpenWeatherMap directly!)

## How It Works

### Before (Insecure):
```
Browser → OpenWeatherMap API (with exposed key)
```

### After (Secure):
```
Browser → Your Netlify Function → OpenWeatherMap API (key hidden on server)
```

## Troubleshooting

### Error: "Unable to fetch weather data"

**Check 1: Environment Variable**
- Go to Site Settings → Environment Variables
- Make sure `OPENWEATHER_API_KEY` is set correctly
- If you just added it, trigger a new deploy

**Check 2: Function Logs**
- Go to Functions tab in Netlify dashboard
- Click on `weather` function
- Check the logs for errors

**Check 3: API Key**
- Go to OpenWeatherMap: https://home.openweathermap.org/api_keys
- Make sure your key is active (can take 10 minutes after creation)

### Function not found

- Check that `netlify/functions/weather.js` exists in your repo
- Check `netlify.toml` has: `functions = "netlify/functions"`
- Trigger a new deploy

### CORS Error

- The serverless function includes CORS headers
- Try clearing browser cache and reloading

## Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain management"
2. Click "Add custom domain"
3. Follow instructions to point your domain to Netlify

## Benefits of This Setup

✅ **Security** - API key never exposed to users
✅ **Free Hosting** - Netlify free tier is generous
✅ **Auto Deploys** - Push to GitHub = automatic deployment
✅ **SSL Certificate** - Free HTTPS included
✅ **Edge Network** - Fast global delivery
✅ **Serverless** - No server to manage

## Comparison: GitHub Pages vs Netlify

| Feature | GitHub Pages | Netlify |
|---------|-------------|---------|
| Static hosting | ✅ | ✅ |
| Serverless functions | ❌ | ✅ |
| Environment variables | ❌ | ✅ |
| API key security | ❌ | ✅ |
| Auto deploy from Git | ✅ | ✅ |
| Custom domain | ✅ | ✅ |
| Free SSL | ✅ | ✅ |

## Your API Key

For reference, your OpenWeatherMap API key is: `42b14313ead9beeb67c25fd77291a879`

**Add this to Netlify environment variables, then you can delete it from this file!**

## Next Steps

1. Deploy to Netlify (follow steps above)
2. Add environment variable
3. Test the site
4. Share your new Netlify URL!

Your weather website will be live at: `https://YOUR-SITE-NAME.netlify.app`

---

Need help? Check Netlify docs: https://docs.netlify.com/functions/overview/
