#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --ansi never"

cd /home/vechorkadev/www/
$COMPOSE run wp php /var/www/html/wp-cron.php
