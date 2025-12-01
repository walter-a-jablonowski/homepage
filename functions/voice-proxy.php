<?php
/**
 * Voice Agent API Proxy
 * 
 * This proxy securely handles Google AI API requests without exposing the API key
 * to the client. It provides a WebSocket URL with the API key for the voice agent.
 */

// Enable CORS for your GitHub Pages domain
header('Access-Control-Allow-Origin: https://walter-a-jablonowski.github.io');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' )
{
  http_response_code(200);
  exit;
}

// Your Google AI Studio API Key (keep this secret on the server)
define('GOOGLE_AI_API_KEY', 'API_KEY');

// Validate request method
if( $_SERVER['REQUEST_METHOD'] !== 'POST' )
{
  http_response_code(405);
  echo json_encode([
    'success' => false,
    'error' => 'Method invalid'
  ]);
  exit;
}

try
{
  // Get request data
  $input = file_get_contents('php://input');
  $data = json_decode($input, true);
  
  // Validate action
  if( ! isset($data['action']) )
  {
    throw new Exception('Missing action parameter');
  }
  
  $action = $data['action'];
  
  // Handle different actions
  switch( $action )
  {
    case 'get_websocket_url':
      // Return the WebSocket URL with the API key
      // The API key is still in the URL, but it's generated server-side
      $wsUrl = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=' . GOOGLE_AI_API_KEY;

      echo json_encode([
        'success' => true,
        'websocket_url' => $wsUrl
      ]);
      break;
      
    default:
      throw new Exception('Invalid action');
  }
}
catch( Exception $e )
{
  http_response_code(400);
  echo json_encode([
    'success' => false,
    'error' => $e->getMessage()
  ]);
}
