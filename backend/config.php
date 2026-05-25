<?php
// ARITKX Backend Configuration
// Database credentials for Hostinger MySQL

define('DB_HOST', 'localhost');
define('DB_NAME', 'u177524058_Aritkx');
define('DB_USER', 'u177524058_Aritkx');
define('DB_PASS', 'Devima@0812');
define('DB_CHARSET', 'utf8mb4');

// Admin auth secret key (used for token signing)
define('ADMIN_SECRET', 'aritkx_secure_secret_key_2026_xK9mP');

// Allowed CORS origins
define('ALLOWED_ORIGINS', [
    'https://aritkx.com',
    'https://www.aritkx.com',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
]);

// Upload directory (relative to backend root)
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('UPLOAD_URL', '/backend/uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_MIME_TYPES', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
