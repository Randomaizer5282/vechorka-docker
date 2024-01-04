#!/bin/bash
COMPOSE="/usr/local/bin/docker-compose --ansi never"
DOCKER="/usr/bin/docker"

cd /home/vechorkadev/www/
echo restart `date +"%Y-%m-%d %T"`
$COMPOSE restart client wp