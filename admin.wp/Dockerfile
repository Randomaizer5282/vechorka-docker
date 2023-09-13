FROM wordpress:latest

RUN apt update && apt -y install cron
#RUN chmod 0644 /etc/cron.d/hello-cron
COPY wp-cron-job ./

# Apply cron job
RUN crontab /wp-cron-job