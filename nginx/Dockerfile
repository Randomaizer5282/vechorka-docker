FROM nginx:1.24.0-alpine
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
COPY ./conf/ /etc/nginx/conf.d/
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]