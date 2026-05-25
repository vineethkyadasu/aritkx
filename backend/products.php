<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Database.php';

handleCors();

$db     = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // ─── GET: Fetch all products (or single) ────────────────────────────────
    case 'GET':
        if (isset($_GET['id'])) {
            $product = $db->fetchOne("SELECT * FROM products WHERE id = ? AND active = 1", [(int)$_GET['id']]);
            if (!$product) jsonError('Product not found', 404);
            jsonResponse($product);
        }

        $featured = isset($_GET['featured']) ? " AND featured = 1" : "";
        $category = isset($_GET['category']) && $_GET['category'] !== 'All'
            ? " AND category = " . $db->getConnection()->quote($_GET['category'])
            : "";

        // Admin: show inactive too
        $activeFilter = " AND active = 1";
        $token = getToken();
        if ($token) {
            try { verifyAdminToken(); $activeFilter = ""; } catch (\Exception $e) {}
        }

        $products = $db->fetchAll(
            "SELECT * FROM products WHERE 1=1{$activeFilter}{$featured}{$category} ORDER BY created_at DESC"
        );
        jsonResponse($products);
        break;

    // ─── POST: Create product (admin only) ──────────────────────────────────
    case 'POST':
        verifyAdminToken();
        $data = getRequestBody();

        $name        = trim($data['name'] ?? '');
        $description = trim($data['description'] ?? '');
        $price       = (float)($data['price'] ?? 0);
        $category    = trim($data['category'] ?? 'Uncategorized');
        $image       = trim($data['image'] ?? '');
        $hoverImage  = trim($data['hover_image'] ?? $image);
        $tag         = trim($data['tag'] ?? '') ?: null;
        $stock       = (int)($data['stock'] ?? 100);
        $featured    = (int)((bool)($data['featured'] ?? false));
        $active      = (int)((bool)($data['active'] ?? true));

        if (!$name || $price <= 0) {
            jsonError('Name and a valid price are required');
        }

        $db->query(
            "INSERT INTO products (name, description, price, category, image, hover_image, tag, stock, featured, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [$name, $description, $price, $category, $image, $hoverImage, $tag, $stock, $featured, $active]
        );
        $id = $db->lastInsertId();
        $product = $db->fetchOne("SELECT * FROM products WHERE id = ?", [$id]);
        jsonResponse($product, 201);
        break;

    // ─── PUT: Update product (admin only) ───────────────────────────────────
    case 'PUT':
        verifyAdminToken();
        $data = getRequestBody();
        $id   = (int)($data['id'] ?? $_GET['id'] ?? 0);
        if (!$id) jsonError('Product ID required');

        $fields = [];
        $params = [];

        $updatable = ['name', 'description', 'price', 'category', 'image', 'hover_image', 'tag', 'stock', 'featured', 'active'];
        foreach ($updatable as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $params[] = $data[$field] === '' && $field === 'tag' ? null : $data[$field];
            }
        }

        if (empty($fields)) jsonError('No fields to update');

        $params[] = $id;
        $db->query("UPDATE products SET " . implode(', ', $fields) . " WHERE id = ?", $params);
        $product = $db->fetchOne("SELECT * FROM products WHERE id = ?", [$id]);
        jsonResponse($product);
        break;

    // ─── DELETE: Remove product (admin only) ────────────────────────────────
    case 'DELETE':
        verifyAdminToken();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) jsonError('Product ID required');
        $db->query("DELETE FROM products WHERE id = ?", [$id]);
        jsonResponse(['success' => true, 'message' => 'Product deleted']);
        break;

    default:
        jsonError('Method not allowed', 405);
}
