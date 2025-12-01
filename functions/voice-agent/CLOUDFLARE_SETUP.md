# Cloudflare Workers Setup Guide

## Step-by-Step Instructions (5 minutes)

### 1. Create Cloudflare Account
- Go to https://workers.cloudflare.com
- Click "Sign Up" (it's free)
- Verify your email

### 2. Create a Worker
- Click "Create a Service" or "Create Application" → "Create Worker"
- Give it a name like `voice-proxy` or `homepage-api`
- Click "Deploy"

### 3. Edit the Worker Code
- Click "Quick Edit" or "Edit Code"
- **Delete all existing code** in the editor
- Open `cloudflare-worker.js` from this folder
- **Copy the entire file** and paste it into the Cloudflare editor

### 4. Add Your API Key
- Find this line in the code:
  ```javascript
  const GOOGLE_AI_API_KEY = 'YOUR_API_KEY_HERE';
  ```
- Replace `YOUR_API_KEY_HERE` with your actual Google AI API key:
  ```javascript
  const GOOGLE_AI_API_KEY = 'AIzaSyB78oaweDFpC6SNPFDoxk_tLh_F37B-Cx8';
  ```

### 5. Save and Deploy
- Click "Save and Deploy"
- Wait for deployment to complete (takes ~10 seconds)

### 6. Copy Your Worker URL
- You'll see a URL like: `https://voice-proxy.your-subdomain.workers.dev`
- Copy this URL

### 7. Update config.js
- Open `src/lib/config.js` in your homepage project
- Update the `proxyUrl`:
  ```javascript
  proxyUrl: 'https://voice-proxy.your-subdomain.workers.dev',
  ```

### 8. Test
- Commit and push to GitHub
- Visit your GitHub Pages site
- Click the microphone button
- It should work! 🎉

## Benefits of Cloudflare Workers

✅ **Perfect CORS support** - No configuration needed  
✅ **Fast** - Global CDN with edge computing  
✅ **Free tier** - 100,000 requests per day  
✅ **Reliable** - 99.99% uptime  
✅ **No server management** - Just deploy and forget  

## Troubleshooting

### "API key not configured in worker"
- You forgot to replace `YOUR_API_KEY_HERE` with your actual API key
- Edit the worker and update line 16

### CORS errors
- This shouldn't happen with Cloudflare Workers
- If it does, check that you copied the entire worker code

### "Failed to fetch"
- Check that the worker URL in `config.js` is correct
- Make sure it starts with `https://`
- Verify the worker is deployed (visit the URL in your browser - you should see a JSON error)

## Security Note

The API key is stored in the Cloudflare Worker code, which is:
- ✅ Not in your GitHub repository
- ✅ Not visible to website visitors
- ✅ Executed on Cloudflare's servers, not in the browser

However, the WebSocket URL with the key is still returned to the client. For better security:
- Set domain restrictions in Google AI Studio
- Set usage quotas
- Monitor usage regularly
