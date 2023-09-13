FROM wordpress

RUN apt-get update && apt-get -y install cron && apk add --no-cache tzdata

# Apply cron job
RUN crontab /wp-cron-job