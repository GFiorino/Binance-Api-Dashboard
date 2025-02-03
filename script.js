const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

const elements = {
  chartCanvas: document.getElementById("chart").getContext("2d"),
  cryptoDropdowns: [
    document.getElementById("crypto-dropdown-1"),
    document.getElementById("crypto-dropdown-2"),
    document.getElementById("crypto-dropdown-3"),
  ],
  investmentInput: document.getElementById("investment-input"),
  simulateButton: document.getElementById("simulate-button"),
  tradeResult: document.getElementById("trade-result"),
};

const priceChart = new Chart(elements.chartCanvas, {
  type: "line",
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
  },
});

async function fetchHistoricalData(symbol) {
  const interval = "1h";
  const limit = 50;
  const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.map((candle) => ({
    time: new Date(candle[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    price: parseFloat(candle[4]),
  }));
}

async function updateChart() {
  const historicalData = await Promise.all(
    elements.cryptoDropdowns.map((dropdown) => fetchHistoricalData(dropdown.value))
  );

  priceChart.data.labels = historicalData[0].map((entry) => entry.time);
  priceChart.data.datasets = historicalData.map((data, index) => ({
    label: elements.cryptoDropdowns[index].selectedOptions[0].text,
    data: data.map((entry) => entry.price),
    borderColor: `rgba(${(index + 1) * 80}, ${(index + 1) * 60}, 200, 1)`,
    fill: false,
  }));
  priceChart.update();
}

elements.cryptoDropdowns.forEach((dropdown) => {
  dropdown.addEventListener("change", updateChart);
});

window.addEventListener("DOMContentLoaded", updateChart);
