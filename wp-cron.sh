#!/bin/bash
COMPOSE="/usr/local/bin/docker-compose --ansi never"

cd /home/vechorkadev/www/
echo wp-cron  `date +"%Y-%m-%d %T"`
$COMPOSE run --user=www-data:www-data wp php /var/www/html/wp-cron.php