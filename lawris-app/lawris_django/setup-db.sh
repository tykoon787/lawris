#!/bin/bash

# Install MariaDB (assuming you're using a package manager like apt)
sudo apt-get install mariadb-server
sudo service mariadb start

# Run MariaDB commands
sudo mysql <<EOF
CREATE DATABASE IF NOT EXISTS lawris_db;
CREATE USER IF NOT EXISTS 'lawris_admin'@'localhost' IDENTIFIED BY 'sirwal_db';
USE lawris_db;
GRANT ALL PRIVILEGES ON lawris_db.* TO 'lawris_admin'@'localhost';
GRANT SELECT ON performance_schema.* TO 'lawris_admin'@'localhost';
FLUSH PRIVILEGES;
EOF

# Run Django migrations
python3 manage.py makemigrations
python3 manage.py migrate

#populate database
for ((i=1; i<=3; i++)); do
    echo -e "\n Populating Database... (Run $i):"
    python3 manage.py runscript dms.scripts.create_templates
done

#start server
python3 manage.py runserver 8000
