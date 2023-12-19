Wordpress
---------
To fix the upload you can add the following two commands to your deploy pipeline/script 
or use docker exec -it <container-name> bash to perform it manually on the container.

Set the correct user/group on the uploads folder: $ chown -R www-data:www-data uploads
Set the correct permissions: $ chmod 755 uploads/*

crontab
--------------
add cron jobs from cron-jobs to crontab
sudo crontab -e

wp-cron
-------
wp-cron disabled in wp-config.php

set file wp-cron.sh as executable
chmod +x wp-cron.sh

renew certificates
------
set file ssl-renew.sh as executable
chmod +x ssl-renew.sh