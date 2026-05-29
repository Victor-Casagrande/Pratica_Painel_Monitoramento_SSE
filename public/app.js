const elPetr4 = document.getElementById('val-petr4');
const elVale3 = document.getElementById('val-vale3');
const elItub4 = document.getElementById('val-itub4');
const elWege3 = document.getElementById('val-wege3');
const elBbas3 = document.getElementById('val-bbas3');
const elStatus = document.getElementById('status-conexao');
const elHora = document.getElementById('ultima-atualizacao');
const feedNoticias = document.getElementById('feed-noticias');

const contextoGrafico = document.getElementById('graficoHistorico').getContext('2d');
const limitePontos = 30;

const graficoMercado = new Chart(contextoGrafico, {
  type: 'line',
  data: {
    labels: [], 
    datasets: [
      { label: 'PETR4', borderColor: '#ffca28', data: [], borderWidth: 2, tension: 0.1 },
      { label: 'VALE3', borderColor: '#4caf50', data: [], borderWidth: 2, tension: 0.1 },
      { label: 'ITUB4', borderColor: '#ff5722', data: [], borderWidth: 2, tension: 0.1 },
      { label: 'WEGE3', borderColor: '#00bcd4', data: [], borderWidth: 2, tension: 0.1 },
      { label: 'BBAS3', borderColor: '#e91e63', data: [], borderWidth: 2, tension: 0.1 }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: R$ ${ctx.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      y: { title: { display: true, text: 'Preço (R$)' } }
    },
    animation: { duration: 0 } 
  }
});

const origemEventos = new EventSource('/cotacoes');

origemEventos.onopen = () => {
  elStatus.textContent = 'Ativo e Recebendo Dados';
  elStatus.style.color = '#4CAF50';
};

origemEventos.onmessage = (evento) => {
  const dados = JSON.parse(evento.data);

  elPetr4.textContent = `R$ ${dados.cotacoes.PETR4}`;
  elVale3.textContent = `R$ ${dados.cotacoes.VALE3}`;
  elItub4.textContent = `R$ ${dados.cotacoes.ITUB4}`;
  elWege3.textContent = `R$ ${dados.cotacoes.WEGE3}`;
  elBbas3.textContent = `R$ ${dados.cotacoes.BBAS3}`;
  elHora.textContent = dados.hora;

  const labels = graficoMercado.data.labels;
  labels.push(dados.hora);
  
  graficoMercado.data.datasets[0].data.push(parseFloat(dados.cotacoes.PETR4));
  graficoMercado.data.datasets[1].data.push(parseFloat(dados.cotacoes.VALE3));
  graficoMercado.data.datasets[2].data.push(parseFloat(dados.cotacoes.ITUB4));
  graficoMercado.data.datasets[3].data.push(parseFloat(dados.cotacoes.WEGE3));
  graficoMercado.data.datasets[4].data.push(parseFloat(dados.cotacoes.BBAS3));

  if (labels.length > limitePontos) {
    labels.shift();
    graficoMercado.data.datasets.forEach(dataset => dataset.data.shift());
  }
  graficoMercado.update();

  if (dados.noticia) {
    const cartao = document.createElement('div');
    cartao.className = `cartao-noticia ${dados.noticia.tipo}`;
    cartao.innerHTML = `
      <span class="hora">${dados.hora}</span>
      <strong>${dados.noticia.texto}</strong>
    `;
    
    feedNoticias.prepend(cartao);

    if (feedNoticias.children.length > 20) {
      feedNoticias.removeChild(feedNoticias.lastChild);
    }
  }
};

origemEventos.onerror = () => {
  elStatus.textContent = 'Desconectado / Reconectando...';
  elStatus.style.color = '#f44336';
};