# Etapa 1: build de Angular
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: Nginx para servir app
FROM nginx:alpine
COPY --from=build /app/dist/cert-patrones /usr/share/nginx/html
EXPOSE 80