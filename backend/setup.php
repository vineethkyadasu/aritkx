<?php
/**
 * ARITKX — Database Setup & Seeder
 * Run this script ONCE on your server to initialise all tables and seed initial data.
 * URL: https://yourdomain.com/backend/setup.php
 *
 * IMPORTANT: Delete or rename this file after running it for security.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';

$db = Database::getInstance();
$pdo = $db->getConnection();

echo "<pre style='font-family:monospace;background:#0a0a0a;color:#d4ff00;padding:24px;'>";
echo "=== ARITKX Database Setup ===\n\n";

try {
    // ─── PRODUCTS TABLE ─────────────────────────────────────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(200) NOT NULL,
        description TEXT,
        price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        category    VARCHAR(100) NOT NULL DEFAULT 'Uncategorized',
        image       VARCHAR(500),
        hover_image VARCHAR(500),
        tag         VARCHAR(50),
        stock       INT NOT NULL DEFAULT 100,
        featured    TINYINT(1) NOT NULL DEFAULT 0,
        active      TINYINT(1) NOT NULL DEFAULT 1,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "✓ Table 'products' created.\n";

    // ─── ADMINS TABLE ────────────────────────────────────────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS admins (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(150) NOT NULL,
        email      VARCHAR(200) UNIQUE NOT NULL,
        password   VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "✓ Table 'admins' created.\n";

    // ─── ORDERS TABLE ─────────────────────────────────────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS orders (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        customer_name   VARCHAR(200) NOT NULL,
        customer_email  VARCHAR(200) NOT NULL,
        customer_phone  VARCHAR(50),
        shipping_address TEXT NOT NULL,
        total_amount    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        status          ENUM('Pending','Paid','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
        notes           TEXT,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "✓ Table 'orders' created.\n";

    // ─── ORDER ITEMS TABLE ───────────────────────────────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS order_items (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        order_id   INT NOT NULL,
        product_id INT,
        name       VARCHAR(200) NOT NULL,
        price      DECIMAL(10,2) NOT NULL,
        quantity   INT NOT NULL DEFAULT 1,
        size       VARCHAR(20),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "✓ Table 'order_items' created.\n";

    // ─── INQUIRIES TABLE ────────────────────────────────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS inquiries (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(200) NOT NULL,
        email      VARCHAR(200) NOT NULL,
        subject    VARCHAR(300),
        message    TEXT NOT NULL,
        status     ENUM('New','Read','Replied') DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "✓ Table 'inquiries' created.\n";

    // ─── SEED ADMIN USER ────────────────────────────────────────────────────
    $adminEmail    = 'admin@aritkx.com';
    $adminPassword = password_hash('Devima@0812', PASSWORD_DEFAULT);
    $exists = $db->fetchOne("SELECT id FROM admins WHERE email = ?", [$adminEmail]);
    if (!$exists) {
        $db->query(
            "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
            ['ARITKX Admin', $adminEmail, $adminPassword]
        );
        echo "✓ Admin user created: admin@aritkx.com / Devima@0812\n";
    } else {
        echo "↩ Admin user already exists — skipping.\n";
    }

    // ─── SEED PRODUCTS ──────────────────────────────────────────────────────
    $count = $db->fetchOne("SELECT COUNT(*) as c FROM products")['c'];
    if ($count == 0) {
        $products = [
            ['Void Oversized Tee', 'Ultra-soft heavyweight cotton with a relaxed silhouette. Crafted for identity.', 2499.00, 'Tops', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85&fit=crop', 'Best Seller', 50, 1],
            ['Shadow Cargo Pants', 'Technical multi-pocket cargo with structured fabric and deep utility pockets.', 4999.00, 'Bottoms', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1624378441864-6eda7ca60bd8?w=600&q=85&fit=crop', 'Essential', 35, 1],
            ['Monolith Hoodie', 'Heavyweight French terry with a boxy dropped-shoulder cut. Season-defining statement.', 5499.00, 'Outerwear', 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=85&fit=crop', 'Limited', 20, 1],
            ['Axis Track Jacket', 'Precision-cut track jacket with subtle branding and water-resistant outer shell.', 6299.00, 'Outerwear', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=85&fit=crop', null, 28, 0],
            ['Core Long Sleeve', 'Minimal long-sleeve in premium modal-cotton blend. The everyday essential redefined.', 2999.00, 'Tops', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85&fit=crop', null, 60, 1],
            ['Minimal Joggers', 'Tapered joggers in soft-shell fleece with concealed side pockets and elastic waist.', 3799.00, 'Bottoms', 'https://images.unsplash.com/photo-1539533018257-63783ebde57d?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1624378441864-6eda7ca60bd8?w=600&q=85&fit=crop', 'New', 45, 0],
            ['Archive Bomber', 'Vintage-inspired bomber with quilted lining, rib cuffs and signature ARITKX woven label.', 8499.00, 'Outerwear', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=85&fit=crop', 'Limited', 12, 0],
            ['Noir Cap', 'Structured 6-panel cap with tonal ARITKX embroidery. The finishing piece.', 1499.00, 'Accessories', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85&fit=crop', 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=85&fit=crop', null, 80, 0],
        ];

        $sql = "INSERT INTO products (name, description, price, category, image, hover_image, tag, stock, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        foreach ($products as $p) {
            $db->query($sql, $p);
        }
        echo "✓ Seeded " . count($products) . " products.\n";
    } else {
        echo "↩ Products already seeded ($count records) — skipping.\n";
    }

    echo "\n✅ Setup complete! Please delete or rename this file now.\n";
    echo "\n📋 Admin Login Details:\n";
    echo "   URL:      /admin\n";
    echo "   Email:    admin@aritkx.com\n";
    echo "   Password: Devima@0812\n";

} catch (Exception $e) {
    echo "\n❌ ERROR: " . $e->getMessage() . "\n";
}

echo "</pre>";
