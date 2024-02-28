#!/bin/bash
BACKUP_DIR_DB="/home/vechorkadev/www/backup/db"
BACKUP_DIR_UPLOADS="/home/vechorkadev/www/backup/uploads"
BACKUP_DB_FILE_NAME="$(date +"%d-%m-%y-%H%M%S")"
CONTAINER_NAME="db"
PASSWORD=""

mkdir -p "$BACKUP_DIR_DB"
mkdir -p "$BACKUP_DIR_UPLOADS"

echo "Dumping database: db_vechorka"
docker exec "$CONTAINER_NAME" /usr/bin/mysqldump -u root --password="$PASSWORD" db_vechorka > "$BACKUP_DIR_DB"/"$BACKUP_DB_FILE_NAME"-db_vechorka.sql
/bin/gzip "$BACKUP_DIR_DB"/"$BACKUP_DB_FILE_NAME"-db_vechorka.sql
#remove older 10 days
/usr/bin/find "$BACKUP_DIR_DB" -type f -mtime +10 -exec rm -rf {} \;

echo "Dumping uploads"
tar -czvf "$BACKUP_DIR_UPLOADS"/"$(date +"%y-%m")".tar.gz /home/vechorkadev/www/admin.wp/wordpress/wp-content/uploads/"$(date +"%y")"/"$(date +"%m")"