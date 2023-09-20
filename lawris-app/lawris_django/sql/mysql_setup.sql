-- Creating lawris_db database
-- Privileges for new user (lawris_admin)
CREATE DATABASE IF NOT EXISTS lawris_db;
CREATE USER IF NOT EXISTS 'lawris_admin'@'localhost';
SET PASSWORD FOR 'lawris_admin'@'localhost' = 'sirwal_db';
USE lawris_db;
GRANT ALL PRIVILEGES ON lawris_db.* TO 'lawris_admin'@'localhost';
GRANT SELECT ON performance_schema.* TO 'lawris_admin'@'localhost';
FLUSH PRIVILEGES;