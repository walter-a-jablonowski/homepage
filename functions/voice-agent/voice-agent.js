/**
 * Cloudflare Worker for Voice Agent API Proxy
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://workers.cloudflare.com
 * 2. Sign up for free account
 * 3. Click "Create a Service" or "Create a Worker"
 * 4. Copy this entire file and paste it into the worker editor
 * 5. Replace 'YOUR_API_KEY_HERE' below with your actual Google AI API key
 * 6. Click "Save and Deploy"
 * 7. Copy your worker URL (e.g., https://voice-proxy.your-subdomain.workers.dev)
 * 8. Update config.js with your worker URL
 */

// Your Google AI Studio API Key (stored securely in Cloudflare)
const GOOGLE_AI_API_KEY = 'YOUR_API_KEY_HERE';

export default {
  async fetch(request, env, ctx)
{
  // CORS headers - allow requests from your GitHub Pages
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }

  // Handle preflight OPTIONS request
  if( request.method === 'OPTIONS' )
  {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    })
  }

  // Only allow POST requests
  if( request.method !== 'POST' )
  {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }

  try
  {
    // Parse request body
    const data = await request.json()
    
    // Validate action
    if( !data.action )
    {
      throw new Error('Missing action parameter')
    }
    
    // Handle get_websocket_url action
    if( data.action === 'get_websocket_url' )
    {
      // Check if API key is configured
      if( GOOGLE_AI_API_KEY === 'YOUR_API_KEY_HERE' )
      {
        throw new Error('API key not configured in worker')
      }
      
      // Build WebSocket URL with API key
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${GOOGLE_AI_API_KEY}`
      
      return new Response(JSON.stringify({
        success: true,
        websocket_url: wsUrl
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }
    
    // Invalid action
    throw new Error('Invalid action')
  }
  catch( error )
  {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
  }
};
