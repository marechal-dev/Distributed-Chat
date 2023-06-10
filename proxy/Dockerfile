FROM bitnami/nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443
EXPOSE 80

ENTRYPOINT [ "nginx" ]

CMD [ "-g", "daemon off;" ]
