FROM node:14-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm prune --production

EXPOSE 5000
ENV HOST=0.0.0.0

FROM nginx:1.19-alpine
COPY --from=build /app/public /usr/share/nginx/html
