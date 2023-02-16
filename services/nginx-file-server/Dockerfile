FROM nginx:alpine
WORKDIR /app
RUN rm -rf ./*
COPY ./static /static
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./mime.types /etc/nginx/mime.types
ENTRYPOINT ["nginx", "-g", "daemon off;"]