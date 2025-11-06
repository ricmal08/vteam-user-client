FROM node:20-alpine AS build

WORKDIR /app


COPY package*.json ./
RUN npm install

# Kopiera resten av applikationskoden
COPY . .

# bygg-skript
RUN npm run build

# Prod-miljön
FROM nginx:stable-alpine

# Rensa överflödiga filer i Nginx
RUN rm -rf /usr/share/nginx/html/*

# Vite lägger resultatet i en mapp som heter 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx lyssnar på port 80
EXPOSE 80

# Kommando för att starta Nginx när containern körs
CMD ["nginx", "-g", "daemon off;"]
