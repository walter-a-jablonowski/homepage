# Voice Agent PHP Proxy Setup

This folder contains the PHP proxy script that securely handles Google AI API requests without exposing your API key to the client.

## Setup Instructions

### 1. Upload to PHP Server

Upload the `voice-proxy.php` file to a free PHP hosting service. Some options:

- **InfinityFree** (https://infinityfree.net) - Free PHP hosting
- **000webhost** (https://www.000webhost.com) - Free PHP hosting
- **Vercel** (https://vercel.com) - Supports PHP via serverless functions
- **Netlify** (https://www.netlify.com) - Supports PHP via serverless functions

### 2. Update API Key in PHP File

Edit `voice-proxy.php` and replace the API key on line 23:

```php
define('GOOGLE_AI_API_KEY', 'YOUR_ACTUAL_API_KEY_HERE');
```

### 3. Update Proxy URL in config.js

Edit `src/lib/config.js` and update the proxy URL:

```javascript
proxyUrl: 'https://your-actual-server.com/functions/voice-proxy.php',
```

### 4. Update CORS Settings

In `voice-proxy.php`, update line 10 to match your GitHub Pages domain:

```php
header('Access-Control-Allow-Origin: https://walter-a-jablonowski.github.io');
```

Or for local testing, you can temporarily use:

```php
header('Access-Control-Allow-Origin: *');
```

## Security

- **Never commit the PHP file with your real API key to a public repository**
- Keep the PHP file only on your server
- The API key is stored securely on the server and never exposed to the client
- CORS headers restrict which domains can access your proxy

## Testing

1. Upload the PHP file to your server
2. Update the proxy URL in `config.js`
3. Test locally first with `http://localhost` or your local dev server
4. Deploy to GitHub Pages and test the live site

## Trouble

- **CORS errors**: Check that the CORS header matches your domain exactly
- **Connection failed**: Verify the proxy URL is correct and accessible
- **API errors**: Check that your Google AI API key is valid and has the correct permissions
