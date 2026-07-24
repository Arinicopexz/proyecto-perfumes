FROM nginx:alpine
# Copiamos nuestro HTML directamente al servidor web
COPY ./public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]