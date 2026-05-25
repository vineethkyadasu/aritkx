<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Database.php';

handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

verifyAdminToken();

$db = Database::getInstance();

// ─── Core Counts ─────────────────────────────────────────────────────────────
$totalProducts  = (int)($db->fetchOne("SELECT COUNT(*) as c FROM products WHERE active = 1")['c'] ?? 0);
$totalOrders    = (int)($db->fetchOne("SELECT COUNT(*) as c FROM orders")['c'] ?? 0);
$newInquiries   = (int)($db->fetchOne("SELECT COUNT(*) as c FROM inquiries WHERE status = 'New'")['c'] ?? 0);

$revenueRow = $db->fetchOne("SELECT SUM(total_amount) as total FROM orders WHERE status NOT IN ('Cancelled')");
$totalRevenue = (float)($revenueRow['total'] ?? 0);

// ─── Orders by Status ──────────────────────────────────────────────────────
$statusCounts = $db->fetchAll("SELECT status, COUNT(*) as count FROM orders GROUP BY status");
$orderStatusMap = [];
foreach ($statusCounts as $row) {
    $orderStatusMap[$row['status']] = (int)$row['count'];
}

// ─── Sales Last 7 Days ────────────────────────────────────────────────────
$salesTrend = $db->fetchAll(
    "SELECT DATE(created_at) as date, SUM(total_amount) as total, COUNT(*) as orders
     FROM orders
     WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       AND status NOT IN ('Cancelled')
     GROUP BY DATE(created_at)
     ORDER BY date ASC"
);

// ─── Products by Category ─────────────────────────────────────────────────
$categoryBreakdown = $db->fetchAll(
    "SELECT category, COUNT(*) as count FROM products WHERE active = 1 GROUP BY category ORDER BY count DESC"
);

// ─── Recent Orders ─────────────────────────────────────────────────────────
$recentOrders = $db->fetchAll(
    "SELECT id, customer_name, customer_email, total_amount, status, created_at FROM orders ORDER BY created_at DESC LIMIT 8"
);

jsonResponse([
    'stats' => [
        'total_revenue'  => $totalRevenue,
        'total_orders'   => $totalOrders,
        'total_products' => $totalProducts,
        'new_inquiries'  => $newInquiries,
    ],
    'order_status_map'   => $orderStatusMap,
    'sales_trend'        => $salesTrend,
    'category_breakdown' => $categoryBreakdown,
    'recent_orders'      => $recentOrders,
]);
