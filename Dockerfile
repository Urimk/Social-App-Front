# שלב 1: בניית ה-React App
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# שלב 2: הגשת הקבצים באמצעות Nginx
FROM nginx:alpine

# העתקת קבצי ה-Build מתוך שלב 1
COPY --from=build /app/dist /usr/share/nginx/html

# קונפיגורציית Nginx לתמיכה ב-SPA routing (React Router)
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]