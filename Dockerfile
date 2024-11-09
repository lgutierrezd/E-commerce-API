# Usa una imagen base de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /E-COMMERCE-API

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu app va a correr (por defecto 3000 para Express)
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]

#docker build -t ecommerce_api . 
#docker run -p 3000:3000 ecommerce_api  