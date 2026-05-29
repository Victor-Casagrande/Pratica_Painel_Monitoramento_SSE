# Simulador de Mercado Financeiro (Server-Sent Events)

Projeto prático de arquitetura web desenvolvido para demonstrar o comportamento do protocolo Server-Sent Events (SSE). A aplicação simula o fluxo contínuo e unidirecional de dados característico de terminais financeiros e pregões de bolsa de valores, onde o servidor é a única fonte da verdade.

## Instituição
* **Instituto Federal Catarinense (IFC) - Campus Videira**
* **Curso:** Ciência da Computação

## Arquitetura e Tecnologias
A arquitetura baseia-se na separação total de responsabilidades, servindo estáticos nativamente e gerenciando o pool de eventos.

* **Backend:** Node.js (Módulos nativos `http`, `fs`, `path` - Sem frameworks externos)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Visualização de Dados:** Chart.js (via CDN)
* **Protocolo:** HTTP/1.1 persistente via interface `EventSource`

## Estrutura do Projeto
* `server.js` - Servidor HTTP principal, roteamento de estáticos e endpoint da stream SSE.
* `simulador.js` - Lógica de negócios isolada (motor do mercado, processamento de ticks e impacto de notícias).
* `public/` - Diretório de arquivos estáticos servidos pelo backend.

## ⚙️ Como Executar

Você pode executar este projeto de duas maneiras: diretamente via Node.js ou utilizando Docker. Por não possuir dependências externas (Zero `node_modules`), a execução nativa é imediata e não requer a etapa de instalação de pacotes.

### Opção 1: Via Node.js (Nativo)
**Pré-requisito:** Node.js instalado.
1. Clone o repositório.
2. Navegue até a raiz do projeto via terminal.
3. Execute o comando:
   ```bash
   node server.js
4. Acesse no navegador: http://localhost:3000

### Opção 2: Via Docker (Recomendado)
**Pré-requisito:** Docker e Docker Compose instalados.
1. Clone o repositório.
2. Navegue até a raiz do projeto via terminal.
3. Suba o contêiner com o comando: 
   ```bash
   docker compose up -d
4. Acesse no navegador: http://localhost:3000 (Para encerrar a execução, utilize docker compose down)