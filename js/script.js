const countryName = {
  AUD: "Dólar Australiano",
  BGN: "Lev Búlgaro",
  CAD: "Dólar Canadense",
  CHF: "Franco Suíço",
  CNY: "Yuan Chinês",
  CZK: "Coroa Checa",
  DKK: "Coroa Dinamarquesa",
  EUR: "Euro",
  GBP: "Libra Esterlina",
  HKD: "Dólar de Hong Kong",
  HUF: "Forint Húngaro",
  IDR: "Rupia Indonésia",
  ILS: "Shekel Israelense",
  INR: "Rupia Indiana",
  ISK: "Coroa Islandesa",
  JPY: "Iene Japonês",
  KRW: "Won Sul-Coreano",
  MXN: "Peso Mexicano",
  MYR: "Ringgit Malaio",
  NOK: "Coroa Norueguesa",
  NZD: "Dólar Neozelandês",
  PHP: "Peso Filipino",
  PLN: "Zloty Polonês",
  RON: "Leu Romeno",
  SEK: "Coroa Sueca",
  SGD: "Dólar de Singapura",
  THB: "Baht Tailandês",
  TRY: "Lira Turca",
  USD: "Dólar Americano",
  ZAR: "Rand Sul-Africano",
  BRL: "Real Brasileiro"
};
let taxas = {};

function selects(moedas) {
  const deSelect = document.getElementById("de-moeda");
  const paraSelect = document.getElementById("para-moeda");

  for (let moeda in moedas) {
    let deOption = document.createElement("option");
    deOption.value = moeda;
    deOption.textContent = "(" + moeda + ")" + " " + countryName[moeda];
    deSelect.appendChild(deOption);

    let paraOption = document.createElement("option");
    paraOption.value = moeda;
    paraOption.textContent = "(" + moeda + ")" + " " + countryName[moeda];
    paraSelect.appendChild(paraOption);
  }
}

fetch("https://api.frankfurter.app/latest?from=BRL")
  .then((res) => res.json())
  .then((dados) => {
    taxas = dados.rates;
    taxas["BRL"] = 1;
    selects(taxas);
    window.bancoDeTaxas = taxas;
  })
  .catch((erro) =>
    console.error("Não foi possível encotrar essas taxas", erro)
  );

function trocar() {
    const deMoeda = document.getElementById("de-moeda").value;
    const paraMoeda = document.getElementById("para-moeda").value;
    let valor = parseFloat(document.getElementById("valor").value);
    let resultado = document.getElementById("resul");

    if (isNaN(valor)) {
        resultado.innerText = "Digite um número válido";
        return;
    }
    const taxas = window.bancoDeTaxas;

    if (!taxas[deMoeda] || !taxas[paraMoeda]) {
        resultado.innerText = "Moeda não encontrada";
        return;
    }

    let BRLvalor = valor / taxas[deMoeda];
    let valorFinal = BRLvalor * taxas[paraMoeda];

    resultado.innerText = valorFinal.toFixed(2);
    document.getElementById("resul").style.color = "black"
}