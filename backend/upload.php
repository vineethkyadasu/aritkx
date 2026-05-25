<?php
require_once __DIR__ . '/helpers.php';

handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

verifyAdminToken();

if (!isset($_FILES['image'])) {
    jsonError('No image file provided');
}

$file     = $_FILES['image'];
$tmpPath  = $file['tmp_name'];
$origName = $file['name'];
$size     = $file['size'];
$mime     = mime_content_type($tmpPath);

if ($size > MAX_FILE_SIZE) {
    jsonError('File too large. Maximum is 5MB.');
}

if (!in_array($mime, ALLOWED_MIME_TYPES, true)) {
    jsonError('Invalid file type. Allowed: JPEG, PNG, WEBP, GIF');
}

// Create upload dir if missing
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Generate unique filename
$ext      = pathinfo($origName, PATHINFO_EXTENSION);
$filename = uniqid('aritkx_', true) . '.' . strtolower($ext);
$destPath = UPLOAD_DIR . $filename;

if (!move_uploaded_file($tmpPath, $destPath)) {
    jsonError('Failed to save uploaded file', 500);
}

jsonResponse([
    'success'  => true,
    'filename' => $filename,
    'url'      => UPLOAD_URL . $filename,
]);
