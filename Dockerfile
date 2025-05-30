# Etapa 1: Compilar la app Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servir con NGINX
FROM nginx:stable-alpine
COPY --from=build /app/dist/cert-patrones/browser /usr/share/nginx/html

# Si tienes una carpeta específica dentro de dist (ej. dist/portfolio),
# usa esta línea en su lugar:
# COPY --from=build /app/dist/portfolio /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]