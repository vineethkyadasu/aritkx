<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Database.php';

handleCors();

$db     = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // ─── GET: List inquiries (admin only) ────────────────────────────────────
    case 'GET':
        verifyAdminToken();
        $status = isset($_GET['status']) ? " WHERE status = " . $db->getConnection()->quote($_GET['status']) : "";
        $inquiries = $db->fetchAll("SELECT * FROM inquiries{$status} ORDER BY created_at DESC");
        jsonResponse($inquiries);
        break;

    // ─── POST: Submit a contact inquiry (public) ─────────────────────────────
    case 'POST':
        $data    = getRequestBody();
        $name    = trim($data['name'] ?? '');
        $email   = trim($data['email'] ?? '');
        $subject = trim($data['subject'] ?? 'General Inquiry');
        $message = trim($data['message'] ?? '');

        if (!$name || !$email || !$message) {
            jsonError('Name, email and message are required');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonError('Invalid email address');
        }

        $db->query(
            "INSERT INTO inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)",
            [$name, $email, $subject, $message]
        );
        jsonResponse(['success' => true, 'message' => "Thank you $name, we'll respond soon!"], 201);
        break;

    // ─── PUT: Mark inquiry status (admin only) ───────────────────────────────
    case 'PUT':
        verifyAdminToken();
        $data   = getRequestBody();
        $id     = (int)($data['id'] ?? $_GET['id'] ?? 0);
        $status = $data['status'] ?? null;

        if (!$id) jsonError('Inquiry ID required');

        $allowed = ['New', 'Read', 'Replied'];
        if ($status && !in_array($status, $allowed, true)) {
            jsonError('Invalid status');
        }

        $db->query("UPDATE inquiries SET status = ? WHERE id = ?", [$status, $id]);
        jsonResponse(['success' => true]);
        break;

    // ─── DELETE: Remove inquiry (admin only) ─────────────────────────────────
    case 'DELETE':
        verifyAdminToken();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) jsonError('Inquiry ID required');
        $db->query("DELETE FROM inquiries WHERE id = ?", [$id]);
        jsonResponse(['success' => true, 'message' => 'Inquiry deleted']);
        break;

    default:
        jsonError('Method not allowed', 405);
}
