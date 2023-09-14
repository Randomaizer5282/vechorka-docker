#!/bin/bash
COMPOSE="/usr/local/bin/docker-compose --ansi never"
DOCKER="/usr/bin/docker"

cd /home/vechorkadev/www/
echo ssl-renew `date +"%Y-%m-%d %T"`
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP nginx
$DOCKER system prune -af