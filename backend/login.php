<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Database.php';

handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$data = getRequestBody();
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$email || !$password) {
    jsonError('Email and password are required');
}

$db    = Database::getInstance();
$admin = $db->fetchOne("SELECT * FROM admins WHERE email = ?", [$email]);

if (!$admin || !password_verify($password, $admin['password'])) {
    jsonError('Invalid credentials', 401);
}

$token = createToken([
    'id'    => $admin['id'],
    'email' => $admin['email'],
    'name'  => $admin['name'],
    'role'  => 'admin',
]);

jsonResponse([
    'token' => $token,
    'admin' => [
        'id'    => $admin['id'],
        'name'  => $admin['name'],
        'email' => $admin['email'],
    ],
]);
