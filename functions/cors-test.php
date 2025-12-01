<?php
// Simple CORS test file
// Try to force headers before any output
if( !headers_sent() )
{
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Content-Type: text/plain');
}
else
{
  echo "ERROR: Headers already sent!\n";
}

if( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' )
{
  http_response_code(200);
  echo "OPTIONS request received - CORS should work";
  exit;
}

echo "GET/POST request received\n";
echo "Request method: " . $_SERVER['REQUEST_METHOD'] . "\n";
echo "Origin: " . ($_SERVER['HTTP_ORIGIN'] ?? 'none') . "\n";
