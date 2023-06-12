FROM bitnami/nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443
EXPOSE 4242

ENTRYPOINT [ "nginx" ]

CMD [ "-g", "daemon off;" ]
