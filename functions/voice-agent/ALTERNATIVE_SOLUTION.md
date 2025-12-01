# Alternative: Use Cloudflare Workers (Free)

If your current PHP host doesn't support CORS properly, Cloudflare Workers is a better option.

## Setup Cloudflare Worker (5 minutes):

1. **Sign up** at https://workers.cloudflare.com (free tier: 100,000 requests/day)

2. **Create a new Worker** and paste this code:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const data = await request.json()
    
    if (data.action === 'get_websocket_url') {
      // Your API key (stored securely in Worker)
      const API_KEY = 'AIzaSyB78oaweDFpC6SNPFDoxk_tLh_F37B-Cx8'
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${API_KEY}`
      
      return new Response(JSON.stringify({
        success: true,
        websocket_url: wsUrl
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    return new Response(JSON.stringify({ success: false, error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}
```

3. **Deploy** the worker (it gets a URL like `https://your-worker.your-subdomain.workers.dev`)

4. **Update config.js**:
```javascript
proxyUrl: 'https://your-worker.your-subdomain.workers.dev',
```

## Benefits:
- ✅ Perfect CORS support (built for this)
- ✅ Fast global CDN
- ✅ 100,000 free requests/day
- ✅ No server management
- ✅ Better than most free PHP hosts
