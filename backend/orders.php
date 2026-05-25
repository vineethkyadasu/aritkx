<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Database.php';

handleCors();

$db     = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // ─── GET: Fetch orders (admin only) ─────────────────────────────────────
    case 'GET':
        verifyAdminToken();
        if (isset($_GET['id'])) {
            $order = $db->fetchOne("SELECT * FROM orders WHERE id = ?", [(int)$_GET['id']]);
            if (!$order) jsonError('Order not found', 404);
            $order['items'] = $db->fetchAll("SELECT * FROM order_items WHERE order_id = ?", [$order['id']]);
            jsonResponse($order);
        }

        $status = isset($_GET['status']) ? " WHERE status = " . $db->getConnection()->quote($_GET['status']) : "";
        $orders = $db->fetchAll("SELECT * FROM orders{$status} ORDER BY created_at DESC");

        // Attach items count
        foreach ($orders as &$order) {
            $itemCount = $db->fetchOne("SELECT COUNT(*) as c FROM order_items WHERE order_id = ?", [$order['id']]);
            $order['item_count'] = (int)($itemCount['c'] ?? 0);
        }

        jsonResponse($orders);
        break;

    // ─── POST: Create an order (public checkout) ─────────────────────────────
    case 'POST':
        $data = getRequestBody();

        $name    = trim($data['customer_name'] ?? '');
        $email   = trim($data['customer_email'] ?? '');
        $phone   = trim($data['customer_phone'] ?? '');
        $address = trim($data['shipping_address'] ?? '');
        $notes   = trim($data['notes'] ?? '');
        $items   = $data['items'] ?? [];

        if (!$name || !$email || !$address || empty($items)) {
            jsonError('Name, email, shipping address, and at least one item are required');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonError('Invalid email address');
        }

        // Calculate total
        $total = 0;
        foreach ($items as $item) {
            $total += (float)($item['price'] ?? 0) * max(1, (int)($item['quantity'] ?? 1));
        }

        // Insert order
        $db->query(
            "INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, total_amount, notes) VALUES (?, ?, ?, ?, ?, ?)",
            [$name, $email, $phone, $address, $total, $notes]
        );
        $orderId = $db->lastInsertId();

        // Insert items
        foreach ($items as $item) {
            $db->query(
                "INSERT INTO order_items (order_id, product_id, name, price, quantity, size) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    $orderId,
                    (int)($item['product_id'] ?? 0) ?: null,
                    $item['name'] ?? 'Unknown Item',
                    (float)($item['price'] ?? 0),
                    max(1, (int)($item['quantity'] ?? 1)),
                    $item['size'] ?? null,
                ]
            );
        }

        $order = $db->fetchOne("SELECT * FROM orders WHERE id = ?", [$orderId]);
        $order['items'] = $db->fetchAll("SELECT * FROM order_items WHERE order_id = ?", [$orderId]);
        jsonResponse(['success' => true, 'order' => $order, 'order_id' => $orderId], 201);
        break;

    // ─── PUT: Update order status (admin only) ───────────────────────────────
    case 'PUT':
        verifyAdminToken();
        $data = getRequestBody();
        $id   = (int)($data['id'] ?? $_GET['id'] ?? 0);
        if (!$id) jsonError('Order ID required');

        $allowed = ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];
        $status  = $data['status'] ?? null;

        if ($status && !in_array($status, $allowed, true)) {
            jsonError('Invalid status value');
        }

        $fields = [];
        $params = [];

        if ($status) { $fields[] = "status = ?"; $params[] = $status; }
        if (isset($data['notes'])) { $fields[] = "notes = ?"; $params[] = $data['notes']; }

        if (empty($fields)) jsonError('No fields to update');

        $params[] = $id;
        $db->query("UPDATE orders SET " . implode(', ', $fields) . " WHERE id = ?", $params);
        jsonResponse(['success' => true, 'message' => 'Order updated']);
        break;

    // ─── DELETE: Remove order (admin only) ───────────────────────────────────
    case 'DELETE':
        verifyAdminToken();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) jsonError('Order ID required');
        $db->query("DELETE FROM orders WHERE id = ?", [$id]);
        jsonResponse(['success' => true, 'message' => 'Order deleted']);
        break;

    default:
        jsonError('Method not allowed', 405);
}
