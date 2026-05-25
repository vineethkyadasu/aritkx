<?php
// CORS helper used in all API files

require_once __DIR__ . '/config.php';

function handleCors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Fallback for development — tighten in production
        header("Access-Control-Allow-Origin: *");
    }
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");
    header("Content-Type: application/json; charset=UTF-8");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit(0);
    }
}

function jsonResponse(mixed $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function jsonError(string $message, int $status = 400): void {
    jsonResponse(['error' => $message], $status);
}

function getRequestBody(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

function getToken(): ?string {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['HTTP_X_AUTHORIZATION'] ?? '';
    if (str_starts_with($auth, 'Bearer ')) {
        return substr($auth, 7);
    }
    return null;
}

function verifyAdminToken(): array {
    $token = getToken();
    if (!$token) {
        jsonError('Unauthorized: No token provided', 401);
    }

    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        jsonError('Unauthorized: Invalid token format', 401);
    }

    [$payload64, $sig] = $parts;
    $expectedSig = hash_hmac('sha256', $payload64, ADMIN_SECRET);
    if (!hash_equals($expectedSig, $sig)) {
        jsonError('Unauthorized: Invalid token signature', 401);
    }

    $payload = json_decode(base64_decode($payload64), true);
    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
        jsonError('Unauthorized: Token expired', 401);
    }

    return $payload;
}

function createToken(array $payload, int $ttl = 86400): string {
    $payload['exp'] = time() + $ttl;
    $payload64 = base64_encode(json_encode($payload));
    $sig = hash_hmac('sha256', $payload64, ADMIN_SECRET);
    return "$payload64.$sig";
}
