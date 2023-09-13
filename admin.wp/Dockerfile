FROM wordpress:latest

RUN apt update && apt -y install cron

# Apply cron job
RUN crontab /wp-cron-job