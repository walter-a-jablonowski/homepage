<?php

/**
 * publish.php  –  Sync src/ → local github-pages repo
 *
 * Usage:
 *   php publish.php          # auto-increment version if same date exists in dest
 *   php publish.php 03       # force a specific build number (two digits)
 */

define('SRC',  __DIR__ . '/src');
define('DEST', 'C:/Users/walte/local/walter-a-jablonowski.github.io');

// Ext that carry ?v= cache-busting tokens
$VERSION_EXTS = ['html', 'php', 'js', 'css'];

// Extensions whose content we compare as text (everything else: binary compare)
$TEXT_EXTS = ['html', 'php', 'js', 'css', 'json', 'yml', 'yaml', 'txt', 'md', 'svg', 'xml'];

// ────────────────────────────────────────────────────────────────────────────
// 1.  Determine version string
// ────────────────────────────────────────────────────────────────────────────

$today    = date('ymd');            // e.g. "260402"
$buildNum = isset($argv[1]) ? str_pad((int)$argv[1], 2, '0', STR_PAD_LEFT) : null;

if( $buildNum === null )
{
  // Detect current version in dest index.html
  $destIndex = DEST . '/index.html';
  $currentBuild = '01';

  if( file_exists($destIndex) )
  {
    $content = file_get_contents($destIndex);

    if( preg_match('/\?v=' . $today . '(\d{2})/', $content, $m) )
      $currentBuild = str_pad((int)$m[1] + 1, 2, '0', STR_PAD_LEFT);
  }

  $buildNum = $currentBuild;
}

$version = $today . $buildNum;      // e.g. "26040201"
echo "Version: ?v={$version}\n\n";

// ────────────────────────────────────────────────────────────────────────────
// 2.  Update ?v= tokens in all source files
// ────────────────────────────────────────────────────────────────────────────

echo "Updating version tokens in src/ …\n";

$srcFiles = list_files_recursive(SRC);
$updatedCount = 0;

foreach( $srcFiles as $path )
{
  $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

  if( !in_array($ext, $VERSION_EXTS) )
    continue;

  $content = file_get_contents($path);
  $updated = preg_replace('/\?v=\d{8}/', '?v=' . $version, $content);

  if( $updated !== $content )
  {
    file_put_contents($path, $updated);
    $rel = rel_path(SRC, $path);
    echo "  updated  $rel\n";
    $updatedCount++;
  }
}

echo "  $updatedCount file(s) updated.\n\n";

// ────────────────────────────────────────────────────────────────────────────
// 3.  Sync src/ → dest/  (copy changed/new, remove deleted)
// ────────────────────────────────────────────────────────────────────────────

echo "Syncing files …\n";

$srcFiles  = list_files_recursive(SRC);
$destFiles = list_files_recursive(DEST);

// Build relative-path sets
$srcRel  = [];
foreach( $srcFiles as $p )
  $srcRel[rel_path(SRC, $p)] = $p;

$destRel = [];
foreach( $destFiles as $p )
  $destRel[rel_path(DEST, $p)] = $p;

$copied  = 0;
$removed = 0;

// Copy new / changed files
foreach( $srcRel as $rel => $srcPath )
{
  $destPath = DEST . '/' . $rel;

  if( !file_exists($destPath) || files_differ($srcPath, $destPath, $TEXT_EXTS) )
  {
    $dir = dirname($destPath);

    if( !is_dir($dir) )
      mkdir($dir, 0755, true);

    copy($srcPath, $destPath);
    $marker = file_exists(DEST . '/' . $rel) ? 'updated' : 'added  ';
    echo "  {$marker}  $rel\n";
    $copied++;
  }
}

// Remove files that no longer exist in src
foreach( $destRel as $rel => $destPath )
{
  if( !isset($srcRel[$rel]) )
  {
    unlink($destPath);
    echo "  removed  $rel\n";
    $removed++;
  }
}

// Remove empty directories in dest that are gone from src
remove_empty_dirs(DEST);

echo "\n  $copied file(s) copied/updated, $removed file(s) removed.\n";
echo "\nDone.\n";

// ────────────────────────────────────────────────────────────────────────────
// Helper functions
// ────────────────────────────────────────────────────────────────────────────

function list_files_recursive( string $dir ) : array
{
  $result = [];
  $items  = scandir($dir);

  foreach( $items as $item )
  {
    if( $item === '.' || $item === '..' )
      continue;

    $path = $dir . '/' . $item;

    if( is_dir($path) )
      $result = array_merge($result, list_files_recursive($path));
    else
      $result[] = $path;
  }

  return $result;
}

function rel_path( string $base, string $full ) : string
{
  return ltrim(str_replace('\\', '/', substr($full, strlen($base))), '/');
}

function files_differ( string $a, string $b, array $textExts ) : bool
{
  if( filesize($a) !== filesize($b) )
    return true;

  $ext = strtolower(pathinfo($a, PATHINFO_EXTENSION));

  if( in_array($ext, $textExts) )
    return file_get_contents($a) !== file_get_contents($b);

  // Binary compare in chunks
  $fa = fopen($a, 'rb');
  $fb = fopen($b, 'rb');

  $differ = false;

  while( !feof($fa) )
  {
    if( fread($fa, 8192) !== fread($fb, 8192) )
    {
      $differ = true;
      break;
    }
  }

  fclose($fa);
  fclose($fb);

  return $differ;
}

function remove_empty_dirs( string $dir ) : bool
{
  $empty = true;
  $items = scandir($dir);

  foreach( $items as $item )
  {
    if( $item === '.' || $item === '..' )
      continue;

    $path = $dir . '/' . $item;

    if( is_dir($path) )
    {
      if( !remove_empty_dirs($path) )
        $empty = false;
    }
    else
    {
      $empty = false;
    }
  }

  if( $empty && $dir !== DEST )
  {
    rmdir($dir);
    return true;
  }

  return $empty;
}
