const carteira = { PETR4: 38.50, VALE3: 62.10, ITUB4: 34.20, WEGE3: 39.80, BBAS3: 56.40 };

const bancoDeNoticias = [
  { texto: 'Nova bacia de pré-sal descoberta no litoral', tipo: 'positiva', impacto: { PETR4: 4.50 } },
  { texto: 'Troca inesperada de diretoria na Petrobras', tipo: 'negativa', impacto: { PETR4: -5.00 } },
  { texto: 'Licença ambiental aprovada para mega mina', tipo: 'positiva', impacto: { VALE3: 4.00 } },
  { texto: 'Queda drástica no preço do minério na China', tipo: 'negativa', impacto: { VALE3: -4.50 } },
  { texto: 'Itaú anuncia aquisição de gigante fintech', tipo: 'positiva', impacto: { ITUB4: 3.50 } },
  { texto: 'Aumento na tributação sobre setor bancário', tipo: 'negativa', impacto: { ITUB4: -3.00, BBAS3: -3.00 } },
  { texto: 'WEG fecha contrato bilionário na Europa', tipo: 'positiva', impacto: { WEGE3: 5.00 } },
  { texto: 'Falta de semicondutores paralisa fábrica da WEG', tipo: 'negativa', impacto: { WEGE3: -3.50 } },
  { texto: 'Banco do Brasil reporta lucro acima do esperado', tipo: 'positiva', impacto: { BBAS3: 4.00 } },
  { texto: 'Governo anuncia intervenção no crédito rural', tipo: 'negativa', impacto: { BBAS3: -4.50 } },
  { texto: 'Copom surpreende e corta a taxa Selic', tipo: 'positiva', impacto: { PETR4: 1.5, VALE3: 1.5, ITUB4: 1.5, WEGE3: 1.5, BBAS3: 1.5 } },
  { texto: 'Inflação dispara e Banco Central eleva juros', tipo: 'negativa', impacto: { PETR4: -2.0, VALE3: -2.0, ITUB4: -2.0, WEGE3: -2.0, BBAS3: -2.0 } },
  { texto: 'Crise diplomática afeta exportações', tipo: 'negativa', impacto: { VALE3: -3.0, WEGE3: -2.5, PETR4: -1.5 } },
  { texto: 'Dólar dispara perante o Real', tipo: 'neutra', impacto: { VALE3: 2.5, WEGE3: 2.0, ITUB4: -1.0, BBAS3: -1.0 } },
  { texto: 'Novo pacote de estímulo à infraestrutura', tipo: 'positiva', impacto: { VALE3: 3.0, WEGE3: 2.5, PETR4: 1.0 } }
];

let contadorSegundos = 0;
let alvoProximaNoticia = Math.floor(Math.random() * 3) + 3;

function processarTick() {
  contadorSegundos++;
  let noticiaDoMomento = null;

  if (contadorSegundos >= alvoProximaNoticia) {
    const indexAleatorio = Math.floor(Math.random() * bancoDeNoticias.length);
    noticiaDoMomento = bancoDeNoticias[indexAleatorio];

    for (const [acao, valorImpacto] of Object.entries(noticiaDoMomento.impacto)) {
      carteira[acao] += valorImpacto;
    }

    contadorSegundos = 0;
    alvoProximaNoticia = Math.floor(Math.random() * 3) + 3;
  } else {
    carteira.PETR4 += (Math.random() - 0.5);
    carteira.VALE3 += (Math.random() - 0.5);
    carteira.ITUB4 += (Math.random() - 0.5);
    carteira.WEGE3 += (Math.random() - 0.5);
    carteira.BBAS3 += (Math.random() - 0.5);
  }

  for (let acao in carteira) {
    carteira[acao] = Math.max(0.1, carteira[acao]);
  }

  return {
    cotacoes: {
      PETR4: carteira.PETR4.toFixed(2),
      VALE3: carteira.VALE3.toFixed(2),
      ITUB4: carteira.ITUB4.toFixed(2),
      WEGE3: carteira.WEGE3.toFixed(2),
      BBAS3: carteira.BBAS3.toFixed(2)
    },
    noticia: noticiaDoMomento,
    hora: new Date().toLocaleTimeString('pt-BR', { hour12: false })
  };
}

module.exports = { processarTick };