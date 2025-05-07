FROM node:23.11.1-alpine3.18

# Copiamos primero los ficheros necesarios para instalación de dependencias
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./

# Instalamos dependencias de producción y desarrollo
RUN npm install

# Copiamos el código fuente de la aplicación
COPY . .

# Definimos la variable PORT en el contenedor
EXPOSE 5173

# Ejecutamos el comando en modo desarrollo
CMD ["npm", "run", "dev"]