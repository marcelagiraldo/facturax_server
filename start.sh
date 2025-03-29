#!/bin/bash

echo "Iniciando Backend Facturax..."

# Navega al directorio de tu proyecto (con comillas por espacios)
cd "/mnt/c/Users/Marcela Alzate/Documents/server_facturax/newBackend" || {
  echo "Error: No se pudo encontrar el directorio del proyecto."
  exit 1
}

# Verifica si el archivo package.json existe
if [ ! -f "package.json" ]; then
  echo "Error: No se encontró el archivo package.json. Asegúrate de estar en el directorio correcto."
  exit 1
fi

# Instalar dependencias
npm install

# Iniciar el servidor
npm start

echo "Backend en ejecución en el puerto 3000."
