FROM node:22-alpine AS build_image
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production_image
WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
EXPOSE 5174

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript
EXPOSE 5174
CMD [ "npm", "run", "preview" ]