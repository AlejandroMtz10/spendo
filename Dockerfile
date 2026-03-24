# -------- ETAPA 1: FRONTEND BUILD --------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

RUN npm install -g pnpm

# 1. Copiamos archivos de configuración
COPY Frontend/Spendo/package.json Frontend/Spendo/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 2. Copiamos el código fuente
COPY Frontend/Spendo/ ./

# 3. Forzamos variables de entorno para producción
RUN echo "VITE_API_URL=/api" > .env
RUN echo "VITE_APP_KEY=base64:2Knb6yJE/392BkN/6dyhvwjaBcLPk7rtkQfFVf6wTLk3=" >> .env

RUN pnpm run build

# -------- ETAPA 2: BACKEND BUILD (Composer) --------
FROM php:8.2-fpm-alpine AS backend-builder
WORKDIR /var/www/html

# Instalamos dependencias de sistema para PHP y Postgres
RUN apk add --no-cache libpq-dev curl
RUN docker-php-ext-install pdo pdo_pgsql

COPY Backend/spendo/ ./

# Instalar composer y dependencias de Laravel
RUN curl -sS https://getcomposer.org/installer | php \
    -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-dev --optimize-autoloader

# -------- FINAL IMAGE --------
FROM nginx:alpine

# 1. Instalamos PHP 8.3 y extensiones
# Añadimos php83-common y forzamos la carga de extensiones
RUN apk add --no-cache \
    php83 \
    php83-fpm \
    php83-common \
    php83-pdo_pgsql \
    php83-mbstring \
    php83-xml \
    php83-openssl \
    php83-json \
    php83-curl \
    php83-session \
    php83-tokenizer \
    php83-dom \
    php83-xmlwriter \
    php83-bcmath \
    php83-intl \
    php83-ctype \
    php83-opcache \
    curl

# 2. Ajuste de memoria y reporte de errores para ver qué falla
RUN sed -i 's/memory_limit = 128M/memory_limit = 512M/' /etc/php83/php.ini

# 3. Copiar archivos (Frontend y Backend)
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY --from=backend-builder /var/www/html /var/www/html
COPY Backend/spendo/.env /var/www/html/.env
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

# 4. Permisos (Crucial para el Dashboard)
RUN touch /var/www/html/storage/logs/laravel.log && \
    chown -R nginx:nginx /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 5. Limpieza y Optimización
# Ejecutamos con php83 para asegurar compatibilidad
RUN php83 artisan config:clear && \
    php83 artisan route:clear && \
    php83 artisan view:clear

EXPOSE 80

# Usamos -R para que php-fpm corra como root si es necesario o asegurar permisos
CMD ["sh", "-c", "php-fpm83 -R && nginx -g 'daemon off;'"]