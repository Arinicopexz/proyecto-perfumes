# Usamos la versión Debian para evitar el bug de Alpine en WSL
FROM node:18
WORKDIR /app

# Copiamos package.json
COPY package*.json ./

# Forzamos la instalación limpia
RUN npm cache clean --force
RUN npm install

# Copiamos el resto del código del backend
COPY . .

EXPOSE 5000
CMD ["npm", "start"]