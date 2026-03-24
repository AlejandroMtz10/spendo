# Etapa de compilación
FROM node:20-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

# 1. Copiamos SOLO los archivos de paquetes para instalar dependencias primero
COPY package.json pnpm-lock.yaml ./

# 2. Instalación limpia (hoisted para evitar el error de rollup)
RUN pnpm config set node-linker hoisted
RUN pnpm install --frozen-lockfile

# 3. AHORA copiamos el resto (el .dockerignore evitará que entre basura)
COPY . .

# 4. Creamos el .env
RUN echo "VITE_API_URL=http://localhost:8000/api" > .env

RUN pnpm run build

# --- SERVIDOR NGINX ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]