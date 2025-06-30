# Imagen base
FROM node:latest

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]

# Añadir wait script
COPY wait-for-postgres.js .

CMD ["sh", "-c", "node wait-for-postgres.js && npm run dev"]

