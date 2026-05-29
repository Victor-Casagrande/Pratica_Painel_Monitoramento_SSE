# Utiliza uma imagem oficial e leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia todos os arquivos do projeto local para dentro do contêiner
COPY . .

# Expõe a porta que o nosso servidor utiliza
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]