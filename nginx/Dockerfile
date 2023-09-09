FROM nginx:1.24.0-alpine
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]