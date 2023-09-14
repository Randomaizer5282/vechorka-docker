Wordpress
---------
To fix the upload you can add the following two commands to your deploy pipeline/script 
or use docker exec -it <container-name> bash to perform it manually on the container.

Set the correct user/group on the uploads folder: $ chown -R www-data:www-data uploads/*
Set the correct permissions: $ chmod 755 uploads/*