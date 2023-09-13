#!/bin/bash
COMPOSE="/usr/local/bin/docker-compose --ansi never"
DOCKER="/usr/bin/docker"

cd /home/vechorkadev/www/
echo wp-cron  `date +"%Y-%m-%d %T"`
$COMPOSE run certbot --dry-run && $COMPOSE kill -s SIGHUP nginx
$DOCKER system prune -af