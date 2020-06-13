FROM nginx:1.17.10

COPY dist/front-end-market-data/ /usr/share/nginx/html/

CMD nginx -g 'daemon off;'
