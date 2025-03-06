# Etapa de build
FROM node:22-alpine AS build_image
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS production_image
WORKDIR /app
COPY --from=build_image /app/dist/ /app/dist/
COPY package.json vite.config.ts ./
RUN npm install typescript

ENV PORT=5174
EXPOSE ${PORT}

CMD ["npm", "run", "preview"]