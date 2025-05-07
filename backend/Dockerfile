FROM node:18.18.0
WORKDIR /usr/src/app

# Copiamos primero los ficheros necesarios para instalación de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el código
COPY . .

# Definimos la variable PORT en el contenedor
EXPOSE 3001

# Ejecutamos el comando en modo de desarrollo
CMD ["npm", "run", "dev"]