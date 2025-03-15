# Etapa de build
FROM node:22-alpine AS build_image
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS production_image
WORKDIR /app

FROM nginx:alpine
COPY --from=build_image /app/dist/ /usr/share/nginx/html
COPY package.json vite.config.ts ./

RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { \
  try_files $uri $uri/ /index.html; \
  } \
  }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
