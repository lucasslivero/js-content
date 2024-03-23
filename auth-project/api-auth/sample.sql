INSERT INTO roles (name) VALUES ("Admin"), ("User");
INSERT INTO permissions (name, code) VALUES ("Show Orders", "orders:read"), ("Create Orders", "orders:create");
INSERT INTO roles_permissions (role_id, permission_id) VALUES ("<ADMIN_id>", "orders:read"), ("<ADMIN_id>", "orders:create"), ("<USER_id>", "orders:read");

