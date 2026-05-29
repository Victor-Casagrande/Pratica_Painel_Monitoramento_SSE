const http = require('http');
const fs = require('fs');
const path = require('path');
const { processarTick } = require('./simulador');

const porta = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

const servidor = http.createServer((requisicao, resposta) => {
  if (requisicao.url === '/cotacoes') {
    resposta.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    const enviarCotacoes = () => {
      const dados = processarTick();
      resposta.write(`data: ${JSON.stringify(dados)}\n\n`);
    };

    const intervalo = setInterval(enviarCotacoes, 1000);

    requisicao.on('close', () => clearInterval(intervalo));
    return;
  }

  let urlArquivo = requisicao.url === '/' ? '/index.html' : requisicao.url;
  const caminhoArquivo = path.join(__dirname, 'public', urlArquivo);
  const extensao = String(path.extname(caminhoArquivo)).toLowerCase();
  const contentType = mimeTypes[extensao] || 'application/octet-stream';

  fs.readFile(caminhoArquivo, (erro, conteudo) => {
    if (erro) {
      resposta.writeHead(erro.code === 'ENOENT' ? 404 : 500);
      resposta.end();
    } else {
      resposta.writeHead(200, { 'Content-Type': contentType });
      resposta.end(conteudo, 'utf-8');
    }
  });
});

servidor.listen(porta);