FROM wordpress:latest

RUN apt update && apt -y install cron
#RUN chmod 0644 /etc/cron.d/hello-cron
COPY /wordpress/wp-cron-job /

# Apply cron job
RUN crontab ./wp-cron-job

# Create the log file to be able to run tail
RUN touch /logs/cron.log

# Run the command on container startup
CMD cron && tail -f /logs/cron.log