#!/bin/bash
BACKUP_DIR="/home/vechorkadev/www/backup"
BACKUP_FILE_NAME="$(date +"%d-%m-%y-%H%M%S")"
CONTAINER_NAME="db"
PASSWORD=""

mkdir -p "$BACKUP_DIR"

echo "Dumping database: db_vechorka"
docker exec "$CONTAINER_NAME" /usr/bin/mysqldump -u root --password="$PASSWORD" db_vechorka > "$BACKUP_DIR"/"$BACKUP_FILE_NAME"-db_vechorka.sql
/bin/gzip "$BACKUP_DIR"/"$BACKUP_FILE_NAME"-db_vechorka.sql

echo "Dumping uploads"
tar -czvf "$BACKUP_DIR"/uploads-"$(date +"%m-%y")".tar.gz /home/vechorkadev/www/admin.wp/wordpress/wp-content/uploads/

#remove older 10 days
/usr/bin/find "$BACKUP_DIR" -type f -mtime +10 -exec rm -rf {} \;